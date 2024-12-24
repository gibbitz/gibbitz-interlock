import { systemLog } from '@utils'
/**
 * handler for changes to form input fields
 * @callback FormFieldChangeHandler
 * @param {Event} event DOM event
 *
*/
/**
 * Factory to generate form field change handlers where the default inputs can't be used
 * dynamic page elements etc.
 *
 * @param {DocumentSheet} sheet sheet to add field handlers to
 * @returns {FormFieldChangeHandler}
 */
export const registerFormFieldChange = (sheet) => async (event) => {
  const { uuid, key, render } = event.target.dataset
  let value

  switch (event.target.type) {
    case 'number':
      value = event.target.valueAsNumber
      break
    case 'checkbox':
      value = event.target.checked
      break
    default:
      value = event.target.value
      break
  }

  // TODO: Figure out how to update without focus loss

  const updateItemValues = async (event) => {
    const item = sheet.actor.items.get(uuid)
    await item.update({ [key]: value }, { render })
    event.target.removeEventListener('blur', updateItemValues)
    systemLog(`updateItemValues: ${key}(${uuid})`)
  }

  event.target.addEventListener('blur', updateItemValues)
}