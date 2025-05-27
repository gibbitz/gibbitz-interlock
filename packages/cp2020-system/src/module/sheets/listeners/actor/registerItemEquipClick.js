import {
  replaceStringTokens,
} from '@utils';
import {
  SYSTEM_NAME
} from '@constants'

// TODO: Flesh out documentation here -- need examples

/**
 * handler for clicking equip buttons
 * @callback ItemEquipClickHandler
 * @param {Event} event DOM event
*/

/**
 * Factory to generate Equip Button Click handlers
 *
 * @param {DocumentSheet} edgerunnerSheet sheet to add equip handlers to
 * @param {boolean} equipped the value to set system.equip to. Allows this to function as a stash handler as well
 * @returns {ItemEquipClickHandler}
 */

export const registerItemEquipClick = (edgerunnerSheet, equipped =true) => async (event) => {
  const { uuid } = event?.target.dataset
  const item = edgerunnerSheet.actor.items.get(uuid)
  await item.update({ system: { equipped } })
  edgerunnerSheet.render(false)
}
