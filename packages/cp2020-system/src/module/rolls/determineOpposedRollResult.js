import { systemLog } from '@utils'
import { evaluateRoll } from '@utils/roll/evaluateRoll'

// TODO:
// all items need rolls and documents to translate to chat
// compare attack and dv
// create chat message with result
// rollFormulaToChat()

/**
 * function that accepts the result of combat round dialog data collection then
 * makes and chat logs the results
 * @param {*} param0
 */
export const determineOpposedRollResult = async ({attack, dv, defense, ...meta}) => {
  systemLog('ROLL META | ', meta)

  // roll attack
  systemLog('ATTACK META | ', attack)
  const attackRoll = await evaluateRoll(attack.rollData)

  if (attackRoll.isFumble) {
    ChatMessage.create({
      // TODO: use rolltable to determine fumble string
      content: 'you fumbled dawg'
    })

  } else {

    // determine inbound roll (opposed or unopposed)
    // pull dv if unopposed
    if (dv) {
      systemLog('DV META | ', dv)
      const dvRoll = await evaluateRoll(dv.rollData)
      ChatMessage.create({
        flavor: dv.rollData.flavor || `${attack.rollData.actor.name} must beat : `,
        rolls: [dvRoll.rollInfo]
      })
    }

    // roll dv if opposed
    if (defense) {
      systemLog('DEFENSE META | ', defense)
      const defenseRoll = await evaluateRoll(defense.rollData)
      ChatMessage.create({
        flavor: defense.rollData.flavor || `${defense.rollData.name} defends with : `,
        rolls: [defenseRoll.rollInfo]
      })
    }

    // chat attack
    ChatMessage.create({
      flavor: attack.rollData.flavor || `${attack.rollData.actor.name} attacks with ${attack.rollData.name} for : `,
      rolls: [attackRoll.rollInfo]
    })
  }
}
