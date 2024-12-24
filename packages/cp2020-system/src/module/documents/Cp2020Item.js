import { ITEM_DOCUMENT_TYPES } from '@constants';
import {
  Outfit,
  Weapon,
  Skill,
  Cp2020BaseItem
} from './item'

/**
 * Hacks the single Item Document limitation of Foundry through composition
 * Whenever new methods are added to any child classes they will need to be added here as well
 * @extends {Item}
 */
export class Cp2020Item extends Item {
  /** @override */
  constructor(...args) {
    super(...args)
    const [{ type }] = args
    let gadget
    switch (type) {
      case ITEM_DOCUMENT_TYPES.SKILL:
        gadget = new Skill(...args)
        break
      case ITEM_DOCUMENT_TYPES.WEAPON:
        gadget = new Weapon(...args)
        break
      case ITEM_DOCUMENT_TYPES.OUTFIT:
      default:
        gadget = new Outfit(...args)
        break
    }
    Object.assign(this, gadget)
    // set expected methods
    // (not using SET/GET so skipped in Object.assign)
    this.getRollData = gadget.getRollData
    this.prepareData = gadget.prepareData
    this.roll = gadget.roll
  }
}
