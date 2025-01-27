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
  let IP = 0
  systemLog(' ROLL RESULTS |', rollInfo.dice[0]?.results)

  const isFumble = rollInfo.dice[0]?.results[0].result === 1
  systemLog(' FUMBLED? | ', isFumble)
  // TODO roll on the fumble table & hold value for IP

  const isCrit = rollInfo.dice[0]?.results
    .filter(({ exploded }) => exploded).length > 0
  systemLog(' EXPLODED? |', isCrit)
  // use total to determine DV difference for IP

  return ({
    isFumble,
    isCrit,
    rollInfo,
    IP
  })
}