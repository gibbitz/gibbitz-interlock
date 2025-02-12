/**
 * Utility to get an array of label and value objects representing selected
 * options in an HTML select element
 * @param {string|HTMLSelectElement} selector    Selector string for select
 *                                               element or the element itself
 * @param {HTMLFormElement} [form]               Form Element where selector can
 *                                               be queried
 * @returns {Array}
 */
export const getSelectedOptions = (selector='select', form) => {
  let selectField = selector
  if (typeof selector === 'string') {
    selectField = form.querySelector(selector)
  }
  const selected = Array
    .from(selectField?.childNodes || [])
    .filter(node => node.selected)
  return selected.reduce(
    (acc, { label, value }) => ([{ label, value }, ...acc]),
    []
  )
}