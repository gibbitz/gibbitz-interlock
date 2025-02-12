import { TASK_DV_DIALOG_PATH, SYSTEM_NAME } from '@constants'
import { replaceStringTokens, createFormDialog, systemLog } from '@utils'
import { addFormMetaField, appendFormMeta, getSelectedOptions } from '@utils/dialogs'
import { appendModifier } from '@utils/roll'

export const createCheckDvDialog = async context => new Promise(resolve => {
  const { name: skillName, actor: { name: actorName } } = context
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.dv.title`),
    skillName
  )

  const label = game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.dv.action`)

  let dvRollData = {
    actor: context.actor,
    rollFormula: ''
  }

  const render = dialog => {
    systemLog('UNOPPOSED CHECK RENDER |', dialog)
    const outputDV = dialog.querySelector('[data-selector="dvOutput"]')
    const baseDVSelect = dialog.querySelector('[data-selector="baseDv"]')
    const modifierSelect = dialog.querySelector('[data-selector="modifiers"]')
    const modifierInput = dialog.querySelector('[data-selector="otherModifier"]')
    const metaInput = addFormMetaField(dialog)
    let modifiers = 0
    let addModifiers = 0
    let baseDV = baseDVSelect.value

    dvRollData.rollFormula = `${baseDV}`

    baseDVSelect.addEventListener('change', (event) => {
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

  }

  const onSubmit = data => {
    const output = { rollData: dvRollData, ...data }
    resolve(output)
    return output
  }

  createFormDialog({
    context,
    template: TASK_DV_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render,
    closeOnSubmit: true
  })
})
