/**
 * Initialize chat data based on passed Item.
 * @param {Item} item item to initialize a chat message about
 * @return {Object} object containing:
 * speaker, rollMode & flavor
 * for use in a chatMessage invocation
 * */
export const initializeChatDataByItem = (item) => {
  const {
    actor,
    name,
    type,
    system: {
      flavor,
    }
  } = item;
  return {
    speaker: ChatMessage.getSpeaker({ actor }),
    rollMode: game.settings.get('core', 'rollMode'),
    flavor: flavor || `[${type}] ${name}`
  }
}