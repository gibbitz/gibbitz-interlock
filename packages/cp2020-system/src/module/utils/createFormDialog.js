import { appendSystemConstants } from '@utils/appendSystemConstants'

/**
 * @callback FormDialogSubmissionHandler
 *
 * a function to handle the form submission.
 * If the data is acceptable, this should return the formdata as needed after the dialog
 * If there is an issue with the form this function should not return or return false
 * @returns {object|false|undefined}
 */

/**
 * @typedef {object} FormDialogParams
 *
 * This is an Object of parameters passed to createFormDialog that allows setting
 * handlers and data manipulation for the Dialog's return
 * @property {object} context an object containing keys to be used in the handlebars template
 * this object will be extended with the system constants via `appendSystemConstants`
 * @property {string} template the path to the handlebars template used to render the form
 * @property {string} title the title to display on the dialog
 * @property {string} label the label for the only button on the dialog
 * @property {FormDialogSubmissionHandler} onSubmit the submission handler for the Dialog
 * @property {Function} render a function that fires on render. Used to attach listeners to the form
 */

/**
 * Utility to wrap form dialogs.
 * This manages rendering handlebars as well as wiring the buttons to collect the
 * form data on submit
 *
 * @param {FormDialogParams} formDialogParams parameters that define the dialog behavior
 * @returns {Promise<Object>}
 */
export const createFormDialog = async ({
  context,
  template,
  title,
  label = 'submit',
  onSubmit = (data) => data,
  render = () => {}
}) => {
  const content = await renderTemplate(
    template,
    appendSystemConstants({
      ...context
    }, game.i18n)
  )
  // return Dialog.wait({
  return foundry.applications.api.DialogV2.wait({
    window: {
      resizable: true,
      title,
    },
    content,
    buttons: [
      {
        action: 'one',
        label,
        callback: (_pointerEvent, _button, dialog) => {
          const formdata = Object.fromEntries(
            new FormData(dialog.querySelector('form')).entries()
          )
          return onSubmit(formdata)
        }
      }
    ],
    render
  })
}