import { createCheckDialog } from '@sheets/dialogs/task'
import { emitSkillChallenge, emitRequestTaskDv } from '@utils/sockets/emitters'
import { getUserIdByActor } from '@utils/getUserIdByActor'

export const rollTaskCheck = async (skill) => {
  // get actors
  const actor = game.actors.getName(skill.parent.name)
  // get skill data
  const rollData = skill.getRollData()
  // get player confirmation (dialog)
  const options = await createCheckDialog({
    name: skill.name,
    actor: rollData.actor,
    rollData
  })
  const taskData = {
    check: { ...options, rollData, actor }
  }
  // determine if opposed
  if (options.isOpposedRoll) {
    // if so, add recipient
    taskData.recipient = getUserIdByActor(game.actors.get(options.targetActorId))
    // and emit for opposed
    emitSkillChallenge(taskData)
  } else {
    // if not set recipient to the Ref
    taskData.recipient = game.users.activeGM.id
    // else emit for DV
    emitRequestTaskDv(taskData)
  }
  return rollData
}