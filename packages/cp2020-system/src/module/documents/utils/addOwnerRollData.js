/**
 * function to append Actor data if the item is Owned
 * @param {Object} rolldata the rolldata to append the actor rollData to
 * @param {Item} item the item to pull the actor from
 * @returns {Object} rollData with appended actor rollData or with an undefined actor key
 * */
export const addOwnerRollData = (rolldata, { actor }) => {
  return {
    ...rolldata,
    actor: actor?.getRollData()
  }
}