import { systemLog } from '@utils/log'
/**
 * @typedef RollData
 * @property {string} rollFormula roll formula to be rolled
 * @property {Object} actor actor rolldata; a subset of Actor.system
 */

/**
 *
 * @param {RollData} rollData retrieved from a document for use in the evaluation
 * @returns
 */
export const evaluateRoll = async (rollData) => {
  const { rollFormula, actor } = rollData
  const roll = new Roll(rollFormula, actor)
  const rollInfo = await roll.evaluate()
  const results = rollInfo.dice[0]?.results
  let IP = 0
  systemLog(' ROLL |', rollInfo)

  const isFumble = !!results?.[0].result === 1
  let fumbleValue = 0
  if (isFumble) {
    systemLog(' FUMBLE! :( ')
    const fumbleRoll = new Roll('1d10', actor)
    fumbleValue = await fumbleRoll.evaluate().total
  }

  const isCrit = !!results?.filter(({ exploded }) => exploded).length > 0
  // TODO: use DV instead of 10 for IP
  const dvTotal = 10
  if (isCrit) {
    systemLog(' CRIT! :) ')
    IP = results.reduce((acc, { result }) => (acc + result), 0) - dvTotal
  }

  return ({
    isFumble,
    fumbleValue,
    isCrit,
    rollInfo,
    IP
  })
}