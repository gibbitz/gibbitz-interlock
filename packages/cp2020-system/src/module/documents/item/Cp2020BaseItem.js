import {
  makeRollByItemType,
  addOwnerRollData
} from '../utils';

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class Cp2020BaseItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare a data object which defines the data schema used
   * by dice roll commands against this Item
   * @override
   */
  getRollData() {
    const { name, _id } = this
    return addOwnerRollData(
      {
        ...super.getRollData(),
        name,
        _id
      },
      this
    )
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @public
   */
  async roll() {
    const { rollFormula } = this.getRollData()

    // If there's no roll formula, throw an error.
    if (!rollFormula) {
      ui.notifications.error(
        `There is no formula to roll ${this.name}!`
      )
      return
    }

    return await makeRollByItemType(this)
  }
}