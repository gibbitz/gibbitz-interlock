import { DV_DIALOG_PATH } from '@constants/handlebars'
import { SYSTEM_NAME } from '@constants'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'
import { addFormMetaField, appendFormMeta, getSelectedOptions } from '@utils/dialogs'
import { appendModifier } from '@utils/roll'

export const createDvDialog = async (context) => new Promise((resolve) => {
  const { name, type } = context.attackPayload.attack.rollData
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.dv.title`),
    `${name} (${type})`
  )
  const label = game.i18n.localize(`${SYSTEM_NAME}.dialogs.dv.action`)

  let dvRollData = {
    actor: context.attackPayload.attack.rollData.actor,
    rollFormula: ''
  }

  const render = (dialog) => {
    const { dvData } = context
    let baseDV = dvData.dv
    let modifiers = 0
    let addModifiers = 0
    const rangeSelect = dialog.querySelector('[data-selector="overrideRange"]')
    const outputDV = dialog.querySelector('[data-selector="dvOutput"]')
    const modifierSelect = dialog.querySelector('[data-selector="modifier"]')
    const modifierInput = dialog.querySelector('[data-selector="otherModifier"]')
    const metaInput = addFormMetaField(dialog)
    appendFormMeta(metaInput, { baseDv: getSelectedOptions(rangeSelect) })

    dvRollData.rollFormula = `${baseDV}`

    rangeSelect.addEventListener('change', (event) => {
      const select = event.target
      baseDV = parseInt(select.value, 10) || baseDV
      outputDV.value = baseDV + (modifiers + addModifiers)
      dvRollData.rollFormula = `${baseDV}${appendModifier(modifiers)}${appendModifier(addModifiers)}`
      appendFormMeta(metaInput, { baseDv: getSelectedOptions(select) })
    })

    // modifiers are subtracted to affect DV, not roll,
    // this is due to selection in DV window by Ref, not players
    modifierSelect.addEventListener('change', (event) => {
      modifiers = Array
        .from(event.target.selectedOptions)
        .reduce((out, opt) => (out + parseInt(opt.value, 10)), 0)
      outputDV.value = baseDV + (modifiers + addModifiers)
      dvRollData.rollFormula = `${baseDV}${appendModifier(modifiers)}${appendModifier(addModifiers)}`
      appendFormMeta(metaInput, { modifiers: getSelectedOptions(event.target) })
    })

    modifierInput.addEventListener('change', ({ target }) => {
      addModifiers = parseInt(target?.value, 10)
      outputDV.value = baseDV + (modifiers + addModifiers)
      dvRollData.rollFormula = `${baseDV}${appendModifier(modifiers)}${appendModifier(addModifiers)}`
    })

    systemLog('UNOPPOSED DEFENSE RENDER |', dialog)
  }

  const onSubmit = (data) => {
    data.rollData = dvRollData
    systemLog('defense submission |', data)
    resolve(data)
  }

  createFormDialog ({
    context,
    template: DV_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render,
    closeOnSubmit: true
  })
})