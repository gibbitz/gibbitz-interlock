import { DAMAGE_DIALOG_PATH, SYSTEM_NAME } from '@constants'
import { createFormDialog, replaceStringTokens, systemLog } from '@utils'

export const createDamageDialog = async (context) => {
  const { name } = context
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.damage.title`),
    name
  )
  const label = game.i18n.localize(`${ SYSTEM_NAME }.dialogs.damage.action`)
  const onSubmit = (data) => {
    // do mutations
    systemLog('damage submission |', data) || data
  }
  const render = (html) => {
    // add handlers
    systemLog('damage submission |', html)
  }
  return createFormDialog({
    context,
    template: DAMAGE_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render
  })
}