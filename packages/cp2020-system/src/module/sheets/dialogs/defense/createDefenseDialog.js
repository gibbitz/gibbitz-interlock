import { DEFENSE_DIALOG_PATH } from '@constants/handlebars'
import { SYSTEM_NAME } from '@constants'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createDefenseDialog = async (context) => {
  const attacker = context.attackPayload.attack.rollData.actor.name
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.defense.title`),
    attacker
  )
  const label = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.defense.defend`),
    attacker
  )
  return createFormDialog ({
    context,
    template: DEFENSE_DIALOG_PATH,
    title,
    label,
    onSubmit: (data) => (systemLog('defense submission |', data) || data),
    render: (html) => systemLog('defense render |', html)
  })
}