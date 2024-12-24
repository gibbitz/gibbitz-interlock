// adapted from Calvin (UTC-6) from discord system development board

/**
 * utility ot get distance in meters between tokens. Used in combat to determine
 * range for DV values
 *
 * @param  {...Token} tokens Foundry Token Objects
 * @returns {Number} grid distance in game units
 */
export const measureWorldDistanceBetweenTokens = (...tokens) => {
  const measureDistanceInPx = (...tokens) => {
    const xDiff = tokens[0].x - tokens[1].x
    const yDiff = tokens[0].y - tokens[1].y
    // per mxzf
    // Algorithm from Pythagoras, c. 600 BC, adapted to JS by Calvin 2024-05-28
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  }
  const pxDistance = measureDistanceInPx(tokens[0], tokens[1])
  return (pxDistance / canvas.grid.size) * canvas.grid.distance
}
