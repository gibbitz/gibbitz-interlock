export const translateObjectValuesFromKeys = (
  i18n,
  keyArray,
  buildLanguagePath = (val) => val
) =>
  keyArray.reduce((outputValues, key, index) => ({
    [key]: i18n.localize(buildLanguagePath(key, index)),
    ...outputValues
  }), {})
