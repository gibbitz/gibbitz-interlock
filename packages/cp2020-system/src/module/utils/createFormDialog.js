import { appendSystemConstants } from '@utils/appendSystemConstants'
import { InterlockFormDialog } from '@sheets/dialogs/InterlockFormDialog'
import { getSerializedFormDataFromEvent } from './getSerializedFormDataFromEvent'

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
  validate = (data) => '',
  onSubmit = (data) => data,
  render = (element) => {},
  closeOnSubmit = false,
  resizeable = false,
  ...rest
}) => {

  const formHandler = (evt) => {
    const formData = getSerializedFormDataFromEvent(evt)
    const errorMessage = validate(formData)
    if (errorMessage) {
      evt.preventDefault()
      ui.notifications.error(errorMessage)
    }
    onSubmit(formData, evt)
    if (closeOnSubmit) {
      formDialog.close()
    }
  }

  const formDialog = new InterlockFormDialog({
    template,
    context: appendSystemConstants(context, game.i18n),
    tag: "form",
    form: {
      handler: formHandler,
      submitOnChange: false,
      closeOnSubmit
    },
    window: {
      title,
      resizeable
    },
    actions: {
      damageType: (...args) => console.log('DT', ...args)
    }
  })

  return formDialog.render(true).then(appWindow => render(appWindow.element))

}