export const rollFormulaToChat = ({ rollFormula, actor, flavor }) => {
  const roll = new Roll(rollFormula, actor.getRollData())

  roll.toMessage({
    speaker: {
      ...ChatMessage.getSpeaker({ actor }),
      // polyfill for Token rolling
      alias: actor.name
    },
    flavor,
    rollMode: game.settings.get('core', 'rollMode'),
  })

  return roll
}