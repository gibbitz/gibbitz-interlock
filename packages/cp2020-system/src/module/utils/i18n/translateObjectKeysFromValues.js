export const translateObjectKeysFromValues = (
  i18n,
  valueArray,
  buildLanguagePath = (val) => val
) =>
  valueArray.reduce((outputValues, value, index) => ({
    [i18n.localize(buildLanguagePath(value, index))]: value,
    ...outputValues
  }), {})
