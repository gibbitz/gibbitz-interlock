/**
 * Appends a hidden inputfield with the name "meta" to a form in the given document
 * @param {HTMLFormElement} dialogElement   The Form Element to append the Meta
 *                                          input field
 * @returns {HTMLInputElement}              the meta input field
 */
export const addFormMetaField = dialogElement => {
  let metaField = dialogElement.querySelector('[name="meta"]')

  if (!metaField) {
    metaField = document.createElement('input')
    metaField.setAttribute('type', 'hidden')
    metaField.setAttribute('name', 'meta')
    dialogElement.appendChild(metaField)
  }

  return metaField
}
