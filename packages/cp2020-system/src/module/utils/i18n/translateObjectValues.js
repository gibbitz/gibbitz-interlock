export const translateObjectValues = (
  i18n,
  targetObject,
  buildLanguagePath = (val) => val
) =>
  Object.keys(targetObject)
    .reduce((output, key) => ({
      ...output,
      key: i18n.localize(buildLanguagePath(targetObject[key]))
    }), {})