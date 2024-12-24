/**
 * handler for add Sibling that generates a new row
 * @callback AddSiblingHandler
 * @param {Event} event DOM event
 * @returns undefined
*/
/**
 * Factory to generate Sibling Add button click handler
 *
 * @param {DocumentSheet} edgerunnerSheet sheet to add sibling to
 * @returns {AddSiblingHandler}
 */
export const registerAddSiblingClick = (edgerunnerSheet) => async (_event) => {
  await edgerunnerSheet.actor.addSibling({
    name: '',
    handle: '',
    gender: '',
    relativeAge: '',
    relationshipNotes: ''
  })
  edgerunnerSheet.render(true)
}