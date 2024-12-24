import { systemLog, rangeToDiscreteLevels, repeatHandlebarsHelper, healthUIHandlebarsHelper } from '@utils'
import { fieldBox } from '@templates/partials/blocks'
import { HBS_TEMPLATE_HELPER_PARAMS } from '@constants/handlebars'

/**
 * registers a handlebars helper function from a partial given the helper name and the complete path to the partial file
 * @param {string} partialName the helper name to register -- this is generally the partial filename minus `-partial.hbs`
 * @param {string} partialPath the path to the partial file
 * @returns null
 */
const registerHelperFromPartialPath = (partialName, partialPath) =>
  systemLog(`registering helper: ${partialName} from: ${partialPath}`) ||
  Handlebars.registerHelper(
    partialName,
    (context, options) => new Handlebars.SafeString(
      Handlebars.partials[partialPath](context?.hash || context, options)
    )
  )

/**
 * registers handlebars helpers for the system
 */
export const registerHandlebarsHelpers = () => {
  // allows access to logging in the template files
  Handlebars.registerHelper('systemLog', systemLog)
  Handlebars.registerHelper('rangeToDiscreteLevels', rangeToDiscreteLevels)
  // partials that are blocks are not possible with hbs syntax as helpers
  // NOTE **NO** BLOCK HELPERS CAN USE ARROW SYNTAX -- DYNAMIC `this` IS *REQUIRED*
  // -- I  guess there are reasons why no one uses handlebars anymore
  Handlebars.registerHelper('cp2020-fieldBox', fieldBox)
  // registers all the preloaded handlebars templates as helper functions
  HBS_TEMPLATE_HELPER_PARAMS.forEach(
    (paramArray) => registerHelperFromPartialPath(...paramArray)
  )
}