export const sectionBox = function (options) {
  return new Handlebars.SafeString(
    `
      <article class="fieldset ${options.hash?.class || ''}">
        ${options.hash?.title
          ? '<div class="legend">' + options.hash?.title + '</div>'
          : ''
        }
          ${ options.fn(this) }
      </article>
    `
  )
}
