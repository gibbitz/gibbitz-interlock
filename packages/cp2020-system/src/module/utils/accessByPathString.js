/**
 * function to recurse an Object by path string and return the value
 * returns undefined if value is not found
 *
 * @param {Object} object object to access by path
 * @param {string} path path representing the location of a key's value in the object
 * @param {string} [delimiter='.'] characters used to separate keys in the string defaults to `.`
 * @returns {*|undefined}
 */
export const accessByPathString = (object, path, delimiter='.') =>
  path.split(delimiter)
    .reduce((parentObject, childString) =>
      parentObject?.[childString],
  object)
