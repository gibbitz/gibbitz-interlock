/**
 * Utility to append Metadata as JSON to metaFields in Dialogs
 * @param {HTMLInputElement} metaField    the input Element to append the JSON
 *                                        data to. Likely this is returned from
 *                                        addFormMetaField
 * @param {Object} metaData               Data to append to the JSON value
 */
export const appendFormMeta = (metaField, metaData) => {
  const metaValue = JSON.parse(metaField?.value || '{}')
  const newValue = JSON.stringify({ ...metaValue, ...metaData })
  metaField.value = newValue
}