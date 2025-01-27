import { appendSystemConstants } from '@utils'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class InterlockFormDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  #templates
  #context

  static PARTS = {}

  set context (context) {
    this.#context = context
  }

  async _prepareContext(options) {
    return appendSystemConstants({...this.#context }, game.i18n)
  }

  constructor(options) {
    super(options)
    const { template, context } = options
    const parts = typeof template !== 'string' ? template : { form: { template } }
    this.#templates = parts
    this.#context = context
  }

  _configureRenderOptions(options) {
    super._configureRenderOptions(options)
    options.parts = {...this.#templates }
  }

  async _renderHTML(context, options) {
    const htmlContent = await renderTemplate(
      options.parts.form.template,
      context
    )
    return htmlContent.trim()
  }

  _replaceHTML(htmlString, target, renderOptions) {
    target.innerHTML = htmlString;
  }

}
