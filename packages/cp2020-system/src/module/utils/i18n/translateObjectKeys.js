export const translateObjectKeys = (
  i18n,
  targetObject,
  buildLanguagePath = (val) => val
) =>
  Object.keys(targetObject)
    .reduce((output, key) => ({
      ...output,
      [i18n.localize(buildLanguagePath(key))]: targetObject[key]
    }), {})