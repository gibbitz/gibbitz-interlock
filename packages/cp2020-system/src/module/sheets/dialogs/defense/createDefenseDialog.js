import { DEFENSE_DIALOG_PATH } from '@constants/handlebars'
import { SYSTEM_NAME } from '@constants'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createDefenseDialog = async (context) => new Promise((resolve) => {
  const attacker = context.attackPayload.attack.rollData.actor.name
  const { rollData } = context
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.defense.title`),
    attacker
  )
  const render = (dialog) => {
    systemLog('defense render |', dialog)
  }
  const onSubmit = (data) => {
    systemLog('defense submission |', data)
    // generate formula and evaluate
    const baseRollFormula = data.skill
      ? data.skillRollFormula // has skill
      : data.statRollFormula // doesn't have skill
    const rollFormula = `${baseRollFormula} + ${data.modifier || 0}`
    // data.roll = await evaluateRoll({ rollFormula, rollData })
    rollData.rollFormula = rollFormula
    data.rollData = rollData
    // pass back
    resolve(data)
  }
  return createFormDialog ({
    context: { ...context, attacker },
    template: DEFENSE_DIALOG_PATH,
    title,
    closeOnSubmit: true,
    onSubmit,
    render
  })
})