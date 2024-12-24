/**
 * handler for clicks that pulls item id from the target dataset to find a rollable item from the owner
 * @callback RollClickHandler
 * @param {Event} event DOM Event with a target property
*/

/**
 * Factory to generate a handler roll callback with the containing sheet as context
 * @param {DocumentSheet} sheet document-sheet for an owned item
 * @returns {RollClickHandler}
 */
export const registerRollClick = (sheet) => ({ target }) => {
  const { uuid } = target.dataset
  const item = sheet.actor.items.get(uuid)
  item.roll()
}