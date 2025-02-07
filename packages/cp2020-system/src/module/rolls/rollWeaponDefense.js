import { createDefenseDialog } from '@sheets/dialogs/defense/createDefenseDialog'
import { emitDefend, emitError } from '@utils/sockets/emitters'
import { SYSTEM_NAME } from '@constants'

/**
 * function to envoke the Attack Defense Dialog to the defender then emit a
 * request to complete the combat turn
 * @param {*} attackPayload
 */
export const rollWeaponDefense = async (attackPayload) => {
  // create rollData for defense
  const { attack: { targetActorId, rollData: { skill: skillName } } } = attackPayload
  // get defender's actor's RollData
  const defender = targetActorId
    ? game.actors.get(targetActorId)
    : game.user.character
  const rollData = defender.getRollData()

  // prep data for dialog context

  // find associated attacker skill
  const skill = game.items.filter(({ name }) => name === skillName)[0] || {}
  const skillOptions = defender.itemTypes.Skill.reduce(
    (col, skill) => {
      const { name } = skill
      const { rollFormula } = skill.getRollData()
      return ({ ...col, [name]: rollFormula })
    }, {}
  )

  // find associated attacker stat
  const statOptions = Object.keys(defender.system.stats).reduce(
    (col, stat) => (defender.system.stats[stat].rollFormula
      ? {
          ...col,
          [game.i18n.localize(`${SYSTEM_NAME}.stats.${stat.toUpperCase()}.long`)]:
            defender.system.stats[stat].rollFormula
        }
      : col
    ),
    {}
  )
  try{
    // collect defense data
    const defense = await createDefenseDialog({
      rollData,
      statOptions,
      skillOptions,
      attackPayload
    })

    // finalize the turn
    emitDefend({
      ...attackPayload,
      defense
    })
  }
  catch(error) {
    // pass back to attacker to re-present the attack
    emitError({ defense: { error: error.message }, ...attackPayload })
  }
}