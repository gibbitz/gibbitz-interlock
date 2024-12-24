/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * as a handler for 'hotbarDrop' the function should return immediately
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
export const createHotbarMacro = (data, slot) => {
  // First, determine if this is a hotbar compatible item.
  if (['Item', 'Stat'].indexOf(data.type) === -1) return

  const { uuid, type, formula, flavor } = data
  let cmd
  let macro
  switch (type) {
    case 'Stat':
      cmd = `game.gibbitzinterlockcp2020.createChatRollMacro('${formula}', '${flavor}', '${uuid}');`;
      macro = game.macros.find(
        ({ command }) => command === cmd
      );
      if (!macro) {
        macro = Macro.create({
          name: `${flavor}`,
          type: 'script',
          command: cmd,
          flags: { 'gibbitz-interlock-cp2020.statMacro': true },
        }).then(macro => {
          game.user.assignHotbarMacro(macro, slot)
        })
      }
      break
    case 'Item':
      if (!uuid.includes('Actor.') && !uuid.includes('Token.')) {
        return ui.notifications.warn(
          'You can only create macro buttons for owned Items'
        );
      }
      // If it is, retrieve it based on the uuid.
      Item.fromDropData(data).then(async (item) => {
        // Create the macro command using the uuid.
        const cmd = `game.gibbitzinterlockcp2020.createItemRollMacro("${uuid}");`;
        let macro = game.macros.find(
          ({ command, name }) => name === item.name && command === cmd
        );
        if (!macro) {
          macro = await Macro.create({
            name: item.name,
            type: 'script',
            img: item.img,
            command: cmd,
            flags: { 'gibbitz-interlock-cp2020.itemMacro': true },
          });
        }
        game.user.assignHotbarMacro(macro, slot)
      })
      break
    default:
      return
      break
  }


  // prevent default behavior from compendia
  return false;
}