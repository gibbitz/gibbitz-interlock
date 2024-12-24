import {
  ITEM_DOCUMENT_TYPES
} from '@constants'

import { rollWeaponAttack } from '@rolls'

import { initializeChatDataByItem } from './initializeChatDataByItem'
/**
 * Util function to generate Roll from rollFormula.
 * Creates chat message if formula is missing
 * @param {Item} item game item with rollFormula and flavor
 * @returns {Roll} roll object or undefined
 * */
export const makeRollByItemType = async (item) => {
  const {
    system: {
      description
    },
    type
  } = item
  // Retrieve roll data.
  const { rollFormula, actor } = item.getRollData()

  const chatData = initializeChatDataByItem(item)

  // If there's no roll data, send a chat message.
  if (!rollFormula) {
    ChatMessage.create({
      ...chatData,
      content: description || '',
    })
    return
  }
  // Otherwise...
  let roll
  switch (type) {
    case ITEM_DOCUMENT_TYPES.WEAPON:
      roll = await rollWeaponAttack(item)
      break
    default:
      // Invoke the roll and submit it to chat.
      roll = new Roll(rollFormula, actor)
      roll.toMessage(chatData)
      break
  }
  return roll;
}