import { getUserIdByActor } from './getUserIdByActor'

/**
 * util to get userId of owner from tokenId
 *
 * @param {string} tokenId Id of target token to determine ownership
 * @returns {string} userId
 */
export const getUserIdFromTokenId = (tokenId) => {
  const { actor } = game.canvas.tokens.get(tokenId)
  return getUserIdByActor(actor)
}