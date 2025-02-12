import { createAttackDialog } from '@sheets/dialogs/combat'
import { determineTargetData } from '@utils'
import { emitOpposedAttack, emitRequestAttackDv } from '@utils/sockets/emitters'
import { MELEE } from '@constants'


/**
 * function to envoke the Attack Dialog and emit a request for either DV or
 * a Defense roll
 * @param {Document} item   weapon used for attack
 * @returns {rollData}      data needed by evaluateRoll call
 */
export const rollWeaponAttack = async (item) => {
  const attacker = game.combat.combatants.getName(item.parent.name).token

  // target calculations
  const {
    targetInfo,
    targetActorId,
    targetOptions,
    multipleTargets
  } = determineTargetData(attacker)

  // attack type
  const { type: weaponType } = item?.system || {}
  const isMelee = weaponType.toLowerCase() === MELEE

  // rolldata
  const rollData = item.getRollData()

  // collect attack options
  const options = await createAttackDialog({
    ...rollData,
    isMelee,
    multipleTargets,
    // TODO: allow shooting warning shots?
    targetOptions,
    targetActorId,
    targetInfo,

  })

  //TODO determine data needed to annotate the roll
  // stat, skill, accuracy, other bonuses, roll, exploded, fumbled

  const recipient = options.isOpposedRoll
    ? targetInfo[options.targetActorId]?.userId
    : game.users.activeGM.id

  const attackData = {
    attack: { ...options, rollData },
    recipient
  }

  if (options.isOpposedRoll) {
    emitOpposedAttack(attackData)
  } else {
    emitRequestAttackDv(attackData)
  }
  return rollData
}