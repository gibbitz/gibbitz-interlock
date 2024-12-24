import { DEFENSE_DIALOG_PATH } from '@constants/handlebars'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createDefenseDialog = async (context) => {
  const attacker = context.attackPayload.attack.rollData.actor.name
  const title = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.defense.title'),
    attacker
  )
  const label = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.defense.defend'),
    attacker
  )
  return createFormDialog ({
    context,
    template: DEFENSE_DIALOG_PATH,
    title,
    label,
    onSubmit: (data) => (systemLog('defense submission |', data) || data),
    render: (html) => systemLog('defense submission |', html)
  })
}