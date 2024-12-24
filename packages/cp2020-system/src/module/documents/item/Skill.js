import { initializeChatDataByItem } from '../utils'
import { Cp2020BaseItem } from './Cp2020BaseItem'

/**
 * Extend the Cp2020BaseItem with Skill specific methods.
 * @extends {Cp2020BaseItem}
 */
export class Skill extends Cp2020BaseItem {

  /**
   * Handle clickable rolls.
   * @public
   * @param {Event} [_event]   The originating click event -- unused
   * @returns {Roll|undefined} roll object or error notification index
  */
  async roll(_event) {
    const {
      actor,
      rollFormula
    } = this.getRollData()

    // If there's no roll formula, throw an error.
    if (!rollFormula) {
      ui.notifications.error(
        `There is no formula to roll ${this.name}!`
      )
      return
    }

    const roll = new Roll(rollFormula, actor)
    // TODO: CUSTOMIZE MESSAGE / CHAT TEMPLATE
    // If you need to store the value first, uncomment the next line.
    // const result = await roll.evaluate();
    roll.toMessage(initializeChatDataByItem(this))

    return roll
  }
}