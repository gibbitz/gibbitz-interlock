import { COUNTER_CHECK_DIALOG_PATH, SYSTEM_NAME, STYLE_HIDDEN } from '@constants'
import { createFormDialog, systemLog, replaceStringTokens } from '@utils'
import { getParentFieldBox } from '@utils/dialogs'

export const createCheckContestDialog = async context => new Promise(resolve => {
  systemLog('createCheckContestDialog | ', context)
  const { rollData:checkRollData, statOptions, skillOptions, taskData } = context
  const { check:
    {
      rollData: {
        name: skillName
      },
      actor: { name: actorName },
      targetActorId
    }
  } = taskData


  const contestant = targetActorId
    ? game.actors.get(targetActorId)
    : game.user.character
  const rollData = contestant.getRollData()

  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.contest.title`),
    actorName,
    skillName
  )

  const action = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.contest.action`),
    skillName
  )

  // TODO: generate items to modify here
  // outfit/cyberware that provides bonuses
  const modifiers = {}

  const render = dialog => {
    const skillSelect = dialog.querySelector('[data-selector="skill-select"]')
    const statSelect = dialog.querySelector('[data-selector="stat-select"]')
    skillSelect.addEventListener('change', (event) => {
      const statSelectFieldBox = getParentFieldBox(statSelect, dialog)
      if (event.target.value === '') {
        statSelectFieldBox.classList.remove(STYLE_HIDDEN)
      } else {
        statSelectFieldBox.classList.add(STYLE_HIDDEN)
      }
    })
  }

  const onSubmit = data => {
    systemLog('CONTEST SUBMISSION |', data)
    // generate formula and evaluate
    const baseRollFormula = data.skillRollFormula
      ? data.skillRollFormula // has skill
      : data.statRollFormula // doesn't have skill
    const rollFormula = `${baseRollFormula} + ${data.modifier || 0}`
    // data.roll = await evaluateRoll({ rollFormula, rollData })
    // rollData.rollFormula = rollFormula
    // rollData.actor = contestant
    // data.rollData = rollData
    const { system: actor, name } = contestant
    // pass back
    const output = {...data, name, rollData:{ actor, rollFormula }}
    resolve(output)
    return output
  }

  createFormDialog({
    context: { ...context, action },
    template: COUNTER_CHECK_DIALOG_PATH,
    title,
    action,
    onSubmit,
    render,
    closeOnSubmit: true
  })
})