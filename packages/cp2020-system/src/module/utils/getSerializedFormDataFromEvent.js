/**
 * Returns key value pairs Object from form submission event's target form element
 * @param { SubmitEvent } event form submission event
 * @returns { Object.<string, string> } Object of key value pairs from form
 */
export const getSerializedFormDataFromEvent = (event) => {
  const output = {}
  const formData = new FormData(event?.target)
  formData.forEach((value, key) => { output[key] = value })
  return output
}