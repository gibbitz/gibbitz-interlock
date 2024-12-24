/**
 * handler for add Event that generates a new row
 * @callback AddLifeEventHandler
 * @param {Event} event DOM event
 * @returns undefined
*/
/**
 * Factory to generate Life Event Add button click handler
 *
 * @param {DocumentSheet} edgerunnerSheet sheet to add lifepath events to
 * @returns {AddLifeEventHandler}
 */
export const registerAddLifepathRowClick = (edgerunnerSheet) => async(_event) => {
  await edgerunnerSheet.actor.addLifeEvent({
    year: '',
    event: ''
  })
  edgerunnerSheet.render(true)
}
