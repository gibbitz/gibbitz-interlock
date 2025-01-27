import { rollFormulaToChat } from '@utils/roll/rollFormulaToChat'
/**
 * handler for clicks that pulls item id from the target dataset to find a rollFormula to roll
 * @callback RollFormulaClickHandler
 * @param {Event} event DOM Event with a target property
*/

/**
 * Factory to generate a Roll Formula handler callback with the containing sheet as context
 * @param {DocumentSheet} sheet document-sheet for an owned item
 * @returns {RollFormulaClickHandler}
 */
export const registerRollFormulaClick = (sheet) => async ({ target }) => {
  const flavorFallback = 'Rolls the dice...'
  const {
    rollFormula,
    flavor = flavorFallback
  } = target.dataset
  const { actor } = sheet
  return rollFormulaToChat({ rollFormula, actor, flavor })
  // const roll = new Roll(rollFormula, actor.getRollData());
  // roll.toMessage({
  //   speaker: {
  //     ...ChatMessage.getSpeaker({ actor: actor }),
  //     // polyfill for Token rolling
  //     alias: actor.name
  //   },
  //   flavor,
  //   rollMode: game.settings.get('core', 'rollMode'),
  // });
  // return roll;
}