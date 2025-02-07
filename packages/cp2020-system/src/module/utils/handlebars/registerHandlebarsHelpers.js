import {
  systemLog,
  rangeToDiscreteLevels,
  replaceStringTokens
} from '@utils'
import { fieldBox, sectionBox } from '@templates/partials/blocks'
import { HBS_TEMPLATE_HELPER_PARAMS } from '@constants/handlebars'
import { SYSTEM_NAME } from '@constants/system'
import { appendSystemConstants } from '@utils'
import { ifEquals } from './utils/ifEquals'

const constants = {
  SYSTEM_NAME
}
/**
 * registers a handlebars helper function from a partial given the helper name and the complete path to the partial file
 * @param {string} partialName the helper name to register -- this is generally the partial filename minus `-partial.hbs`
 * @param {string} partialPath the path to the partial file
 * @returns null
 */
const registerHelperFromPartialPath = (i18n, partialName, partialPath) =>
  systemLog(`registering helper: ${partialName} from: ${partialPath}`) ||
  Handlebars.registerHelper(
    partialName,
    (context, options) => {
      const partialContext = appendSystemConstants((context?.hash || context), i18n)
      return new Handlebars.SafeString(
        Handlebars.partials[partialPath](partialContext, options)
      )
    }
  )

/**
 * registers handlebars helpers for the system
 */
export const registerHandlebarsHelpers = (i18n) => {
  // allows access to logging in the template files
  Handlebars.registerHelper('systemLog', systemLog)
  Handlebars.registerHelper('replaceStringTokens', replaceStringTokens)
  Handlebars.registerHelper('rangeToDiscreteLevels', rangeToDiscreteLevels)
  Handlebars.registerHelper('ifEquals', ifEquals)
  // partials that are blocks are not possible with hbs syntax as helpers
  // NOTE **NO** BLOCK HELPERS CAN USE ARROW SYNTAX -- DYNAMIC `this` IS *REQUIRED*
  // -- I  guess there are reasons why no one uses handlebars anymore
  Handlebars.registerHelper('cp2020-fieldBox', fieldBox)
  Handlebars.registerHelper('cp2020-sectionBox', sectionBox)
  // registers all the preloaded handlebars templates as helper functions
  HBS_TEMPLATE_HELPER_PARAMS.forEach(
    (paramArray) => registerHelperFromPartialPath(i18n, ...paramArray)
  )
}