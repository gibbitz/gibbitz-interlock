/**
 * function to recurse an Object by path string and return the value
 * returns undefined if value is not found
 *
 * @param {Object} object object to access by path
 * @param {string} path path representing the location of a key's value in the object
 * @param {string} [delimiter='.'] characters used to separate keys in the string defaults to `.`
 * @returns {*|undefined}
 */
export const getValueByPath = (object, path, delimiter = '.') =>
  path.split(delimiter)
    .reduce((parentObject, childString) =>
      parentObject?.[childString],
  object)

/**
* function to recurse an Object by path string and set the value
* returns true if value is set
*
* @param {Object} object object to access by path
* @param {string} path path representing the location of a key's value in the object
* @param {*} value value to set on the path
* @param {string} [delimiter='.'] characters used to separate keys in the string defaults to `.`
* @returns {boolean} true if set
*/
export const setValueByPath = (object, path, value, delimiter = '.') => {
  const segments = path.split(delimiter)
  const result = segments.reduce((parentObject, childString, index) => {
    if (index === segments.length - 1 ){
      parentObject[childString] = value
      return []
    }
      return parentObject?.[childString]
    },
    object
  )
  return !result.length
}