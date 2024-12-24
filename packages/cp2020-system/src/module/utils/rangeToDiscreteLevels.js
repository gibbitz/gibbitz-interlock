const DESCRETE_LEVEL_COUNT = 10
/**
 *
 * @param {number} value the current value in the range
 * @param {number} max the highest value in the range
 * @param {number} min the lowest value in the range. defaults to 0
 * @param {string} [classPrefix] string to append the level to. Defaults to an empty string
 * @returns {string} class string ending with the level or just the level
 */
export const rangeToDiscreteLevels = (value, max, min=0, classPrefix='') =>
  `${classPrefix}${Math.round(value * DESCRETE_LEVEL_COUNT / (max - min))}`