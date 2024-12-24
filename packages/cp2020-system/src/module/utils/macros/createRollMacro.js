/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} uuid
 */
export const createItemRollMacro = async (uuid) => {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid,
  };
  // Load the item from the uuid.
  const item = await Item.fromDropData(dropData)
  // Determine if the item loaded and if it's an owned item.
  if (!item || !item.parent) {
    const itemName = item?.name ?? uuid;
    return ui.notifications.warn(
      `Could not find item ${itemName}. You may need to delete and recreate this macro.`
    );
  }

  // Trigger the item roll
  item.roll()
}