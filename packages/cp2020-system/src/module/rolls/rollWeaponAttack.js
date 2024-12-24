import {
  systemLog,
  determineTargetData
 } from '@utils'

import { createOffenseDialog } from '@sheets/dialogs/offense/createOffenseDialog'

import { emitters } from '@utils/sockets/emitters'

import { MELEE } from '@constants'

import { evaluateRoll } from './evaluateRoll'

const { emitOpposedAttack, emitRequestAttackDv } = emitters

export const rollWeaponAttack = async (item) => {
  // target calculations
  const {
    targetInfo,
    targetActorId,
    targetOptions,
    multipleTargets
  } = determineTargetData()

  // attack type
  const { type: weaponType } = item?.system || {}
  const isMelee = weaponType.toLowerCase() === MELEE
  // rolldata
  const rollData = item.getRollData()

  // collect attack options
  const options = await createOffenseDialog({
    ...rollData,
    multipleTargets,
    // TODO: allow shooting warning shots
    targetOptions,
    targetActorId,
    targetInfo,

  })

  // Invoke the roll and submit it to chat.
  const { isFumble, IP, rollInfo } = await evaluateRoll(rollData)

  //TODO determine data needed to annotate the roll
  // stat, skill, accuracy, other bonuses, roll, exploded, fumbled

  // when you fumble, you fumble alone
  if (!isFumble) {

    // set dialog recipient based on inputs
    const recipient = options.isOpposedRoll
      ? targetInfo[options.targetActorId]?.userId
      : game.users.activeGM.id
    const attackData = {
      attack: { ...options, rollData, rollInfo, IP },
      recipient
    }
    if (options.isOpposedRoll) {
      emitOpposedAttack(attackData)
    } else {
      emitRequestAttackDv(attackData)
    }
  } else {
    // TODO; Chat the fumble
  }
  return rollInfo
}