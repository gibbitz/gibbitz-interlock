import { DV_DIALOG_PATH } from '@constants/handlebars'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createAttackDvDialog = async (context) => {
  const { name, type } = context.attackPayload.attack.rollData
  const title = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.dv.title'),
    `${name} (${type})`
  )
  const label = game.i18n.localize('cp2020.dialogs.dv.action')
  const render = (_dialog, DOM) => {
    const { dvData } = context
    let baseDV = dvData.dv
    let modifiers = 0
    let addModifiers = 0
    const rangeSelect = DOM.querySelector('[data-selector="overrideRange"]')
    const outputDV = DOM.querySelector('[data-selector="dvOutput"]')
    const modifierSelect = DOM.querySelector('[data-selector="modifier"]')
    const modifierInput = DOM.querySelector('[data-selector="otherModifier"]')
    rangeSelect.addEventListener('change', (event) => {
      baseDV = parseInt(event.target.value, 10) || defaultDv
      outputDV.value = baseDV - modifiers + addModifiers
    })

    // modifiers are subtracted to affect DV, not roll,
    // this is due to selection in DV window by GM
    modifierSelect.addEventListener('change', (event) => {
      modifiers = Array
        .from(event.target.selectedOptions)
        .reduce((out, opt) => (out - parseInt(opt.value, 10)), 0)
      outputDV.value = baseDV - modifiers + addModifiers
    })

    modifierInput.addEventListener('change', (event) => {
      addModifiers = parseInt(target.value, 10)
      outputDV.value = baseDV - modifiers + addModifiers
    })

    systemLog('UNOPPOSED DEFENSE RENDER |', DOM)
  }
  const onSubmit = (data) => (
    systemLog('defense submission |', data) || data
  )
  return createFormDialog ({
    context,
    template: DV_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render
  })
}