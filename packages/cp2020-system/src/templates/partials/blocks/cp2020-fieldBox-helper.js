export const fieldBox = function (options) {
  return new Handlebars.SafeString(
    `
      <span class="field-box ${options.hash?.class || ''}">
        <span class="field-box--inner">
          ${ options.fn(this) }
        </span>
      </span>
    `
  )
}
