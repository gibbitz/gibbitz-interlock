import { DAMAGE_DIALOG_PATH, SYSTEM_NAME, HEALTH_ACTION_TYPES, STYLE_HIDDEN } from '@constants'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createDamageDialog = async (context) => {
  systemLog('DAMAGE DIALOG | ', context)
  const { name } = context
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.title`),
    name
  )
  const label = game.i18n.localize(`${ SYSTEM_NAME }.dialogs.damage.action`)

  const validate = ({ healthAction, damage, hitLocation, woundType }) => {
    const defaultSelectOption = game.i18n.localize(`${SYSTEM_NAME}.selects.default`)
    switch (healthAction) {
      case defaultSelectOption:
        return game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.errors.required`)
      case HEALTH_ACTION_TYPES[1]:
        if (hitLocation === defaultSelectOption) {
          return game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.errors.wound.hitLocation`)
        }
        if (woundType === defaultSelectOption) {
          return game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.errors.wound.woundType`)
        }
        if (!damage) {
          return game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.errors.wound.damage`)
        }
      default:
        if (!damage) {
          return game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.errors.heal.damage`)
        }
        break
    }
    return false
  }

  const onSubmit = ({ healthAction, damage, hitLocation: location, woundType: type }, event) => {
    // do mutations
    if (healthAction === HEALTH_ACTION_TYPES[1]) {
      context.wound(damage, { type, location })
    } else {
      context.heal(damage)
    }
    return systemLog('damage submission |', event) || event
  }

  const render = (dialog) => {
    // add handlers
    dialog.querySelector('[data-selector="health-action-type"]').addEventListener('change', (event) => {
      systemLog('health actiontype selection |', event.target.value)
      const woundFields = dialog.querySelector('[data-selector="health-wound-fields"]')
      const submitButton = dialog.querySelector('[data-selector="health-submit"]')
      if (event.target.value === HEALTH_ACTION_TYPES[1]) { // wound
        woundFields.classList.remove(STYLE_HIDDEN)
        submitButton.innerText = game.i18n.localize(`${SYSTEM_NAME}.health.damage.wound`)
      } else { // heal (or nothing selected)
        woundFields.classList.add(STYLE_HIDDEN)
        submitButton.innerText = game.i18n.localize(`${SYSTEM_NAME}.health.damage.heal`)
      }
    })
  }
  return createFormDialog({
    context,
    template: DAMAGE_DIALOG_PATH,
    title,
    label,
    validate,
    onSubmit,
    render,
    closeOnSubmit: true
  })
}