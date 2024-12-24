import { replaceStringTokens } from '@utils/replaceStringTokens'

export const notify = (msg, ...replacements) => {
  ui.notifications.error(
    replaceStringTokens(
      game?.i18n.localize(msg),
      ...replacements
    )
  )
}