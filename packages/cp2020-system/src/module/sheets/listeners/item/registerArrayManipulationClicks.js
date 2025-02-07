import { accessByPathString } from '@utils'

// TODO: complete this documentation

/**
 * @typedef {object} ArrayManipulationHandlers
 * @property {AddArrayMemberHandler} add
 * @property {RemoveArrayMemberHandler} remove
 */

/**
 * Handler for add button in array item list
 * @callback AddArrayMemberHandler
 * @param {Event} event DOMEvent containing the target with dataset containing data-uuid & data-meta
 * @example button markup
 * ```html
 * <button
 *  data-selector="add-array-member"
 *  data-uuid="FIELD_UUID"
 *  data-name="FIELD_NAME_PATH"
 * >
 *  Add Row
 * </button>
 * ```
 * ```js
 * // in Sheet
 * const { add } = registerArrayManipulationClicks(this, html)
 * html
 *  .find('[data-selector="add-array-member"]')
 *  .click(add)
 * ```
 */

/**
 *
 * Handler to remove button in array item list
 * @callback RemoveArrayMemberHandler
 * @param {Event} event DOMEvent containing the target with dataset containing data-uuid,
 * data-key & data-meta
 */

/**
 * factory to generate handlers for Array Field Manipulation via UI scoped to the sheet
 *
 * @param {DocumentSheet} sheet
 * @param {JQuery} html jQuery wrapped HTMLElement containing the sheet
 * @returns {ArrayManipulationHandlers}
 */
export const registerArrayManipulationClicks = (sheet, html) => {
  const getItem = (uuid) => sheet.actor?.items?.get(uuid) || sheet.item
  const add = async (event) => {
    const { uuid, meta: name } = event.target.dataset
    const targetArray = accessByPathString(getItem(uuid), name)
    const valueToAdd = html
      .find(`[data-selector="new-row"][data-uuid="${uuid}"]`)
      ?.[0].value
    targetArray.push(valueToAdd)
    sheet.render(true)
  }
  const remove = async (event) => {
    const { uuid, key, meta: name } = event.target.dataset
    const targetArray = accessByPathString(getItem(uuid), name)
    targetArray.splice(key, 1)
    sheet.render(true)
  }
  return ({
    add,
    remove
  })
}