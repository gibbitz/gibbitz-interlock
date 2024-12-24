import {
  replaceStringTokens,
} from '@utils';

// TODO: Flesh out documentation here -- need examples

/**
 * handler for clicking delete buttons
 * @callback ItemDeleteClickHandler
 * @param {Event} event DOM event
*/

/**
 * Factory to generate Delete Button Click handlers
 *
 * @param {DocumentSheet} edgerunnerSheet sheet to add delete handlers to
 * @returns {ItemDeleteClickHandler}
 */

export const registerItemDeleteClick = (edgerunnerSheet) => async (event) => {
  const { uuid } = event?.target.dataset
  const item = edgerunnerSheet.actor.items.get(uuid)
  // prompt user before deletion
  const { type = ITEM_DOCUMENT_TYPES.OUTFIT, name } = item
  const localizeTypeKey = type?.toLowerCase()
  const content = replaceStringTokens(
    game.i18n.localize(`cp2020.dialogs.${localizeTypeKey}.delete.content`),
    name
  )
  const title = replaceStringTokens(
    game.i18n.localize(`cp2020.dialogs.${localizeTypeKey}.delete.title`),
    name
  )
  const render = () => console.log('render delete modal callback called')
  const close = () => console.log('close delete modal callback called')
  const approved = await Dialog.wait({
    title,
    content,
    render,
    close,
    buttons: {
      one: { label: 'delete', callback: () => true },
      two: { label: 'cancel', callback: () => false }
    },
    default: 'two'
  }).catch(() => { /* swallow close error */ })
  if (approved) {
    item?.delete()
    edgerunnerSheet.render(false)
  }
}