import { INITIAL_REPLACE_TOKEN } from '../constants/system'

/**
 * Replaces INITIAL_REPLACE_TOKEN in strings.
 * Used with i18n where JSON limits the use of string templates
 * the pattern is tested in increasing numerical values for each string passed
 * if the first pattern is {$1}, then the second to be replaced would be ${2} etc
 * @example
 * // returns 'this is a short string'
 * replaceStringTokens('this is a ${1} string', 'short')
 * @example
 * // returns 'this is a longer string with two replacements'
 * replaceStringTokens('this is a ${1} string with ${2} replacements', 'longer', 'two')
 * @param {string} initialString string containing replacement patterns
 * @param  {...[string]} tokenValues
 * @return {string} the resultant string with the replacements made
 */
export const replaceStringTokens = (initialString, ...tokenValues) =>
  tokenValues.reduce(
    (output, value, index) =>
      output?.replace(INITIAL_REPLACE_TOKEN.replace('1', index + 1), value),
    initialString
  )