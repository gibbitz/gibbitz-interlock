import { systemLog } from '@utils'

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class Edgerunner extends Actor {
  /**
   * @override
   * Augment the actor source data with additional dynamic data that isn't
   * handled by the actor's DataModel. Data calculated in this step should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const flags = actorData?.flags.gibbitzinterlockcp2020 || {};
  }

  /**
   *
   * @override
   * Augment the actor's default getRollData() method by appending the data object
   * generated by the its DataModel's getRollData(), or null. This polymorphic
   * approach is useful when you have actors & items that share a parent Document,
   * but have slightly different data preparation needs.
   */
  getRollData() {
    const { itemTypes, name, _id } = this
    const rollData = {
      name,
      _id,
      ...super.getRollData(),
      ...itemTypes
    }
    systemLog('EDGERUNNER ROLLDATA | ', rollData)
    return rollData
  }

  async addLifeEvent(lifeEvent) {
    await this.system.updateSource({
      bio: {
        lifepath: [lifeEvent, ...this.system.bio.lifepath]
      }
    })
  }

  async addSibling(sibling) {
    await this.system.updateSource({
      bio: {
        family: {
          siblingCount: this.system.bio.siblings.length + 1
        },
        siblings: [sibling, ...this.system.bio.siblings]
      }
    })
  }

  async wound(damage) {

  }

  async heal(damageCount) {

  }

}
