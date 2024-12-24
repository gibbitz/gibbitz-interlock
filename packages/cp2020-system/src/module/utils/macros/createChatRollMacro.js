/**
 * Creates a chat roll message based on a formula, flavor and valid actor ID
 *
 * @param {string} formula rollFormula to use in the roll
 * @param {string} flavor system flavor string
 * @param {string} id actor _id to fetch actor
 * @return {Roll} Foundry Roll for formula
 */
export const createChatRollMacro = async (formula, flavor, id) => {
  const msg = flavor || 'Rolls the dice...'
  const actor = game.actors.get(id)
  const roll = new Roll(formula, actor?.getRollData());
  roll.toMessage({
    speaker: {
      ...ChatMessage.getSpeaker({ actor }),
      // polyfill for Token rolling
      alias: actor.name
    },
    flavor: msg,
    rollMode: game.settings.get('core', 'rollMode'),
  });
  return roll;
}