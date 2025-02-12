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

    // TODO find modifiers for the skill check
    return super.roll(this)
  }
}