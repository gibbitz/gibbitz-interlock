import { systemLog, replaceStringTokens } from '@utils'
import { SYSTEM_NAME } from '@constants'
import { createCheckContestDialog } from '@sheets/dialogs/task'
import { emitResolveCheck, emitError } from '@utils/sockets'

export const rollTaskOpposition = async (taskData) => {
  systemLog('OPPOSED SKILL |', taskData)
  // create rollData for defense
  const { check: { targetActorId, rollData: { skill: skillName } } } = taskData
  // get contestant's actor's RollData
  const contestant = targetActorId
    ? game.actors.get(targetActorId)
    : game.user.character
  const rollData = contestant.getRollData()

  // prep data for dialog context

  // find associated contestant skill
  const skillOptions = contestant.itemTypes.Skill.reduce(
    (col, skill) => {
      const { name } = skill
      const { rollFormula } = skill.getRollData()
      return ({ ...col, [name]: rollFormula })
    }, {}
  )
  skillOptions[game.i18n.localize(
    `${SYSTEM_NAME}.dialogs.task.contest.noSkill`
  )] = ''

  // find associated contestant stat
  const statOptions = Object.keys(contestant.system.stats).reduce(
    (col, stat) => (contestant.system.stats[stat].rollFormula
      ? {
        ...col,
        [game.i18n.localize(`${SYSTEM_NAME}.stats.${stat.toUpperCase()}.long`)]:
          contestant.system.stats[stat].rollFormula
      }
      : col
    ),
    { [game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.contest.noStat`)]: '' }
  )

  createCheckContestDialog({
    rollData,
    statOptions,
    skillOptions,
    taskData
  })
    .then(async (contest) => {
      emitResolveCheck({
        ...taskData,
        contest
      })
      return contest
    })
    .catch(error => {
      emitError({ defense: { error: error.message }, taskData })
    })
}