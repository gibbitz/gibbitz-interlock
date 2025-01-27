export function ifEquals (...options) {
  return (options[0] === options[1])
    ? options[2]?.fn(this)
    : options[2]?.inverse(this)
}
