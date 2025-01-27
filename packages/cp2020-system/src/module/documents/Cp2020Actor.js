import { ACTOR_DOCUMENT_TYPES } from '@constants';
import { Edgerunner } from './actor';

/**
 * Hacks the single Item Document limitation of Foundry through composition
 * Whenever new methods are added to any child classes they will need to be added here as well
 * @extends {Actor}
 */
export class Cp2020Actor extends Actor {
  /** @override */
  constructor(...args) {
    super(...args)
    const [{ type }] = args
    let character
    switch (type) {
      case ACTOR_DOCUMENT_TYPES.NPC:
      case ACTOR_DOCUMENT_TYPES.EDGERUNNER:
      default:
        character = new Edgerunner(...args)
        break
    }
    // set any properties
    Object.assign(this, character)
    // set expected methods
    // (not using SET/GET so skipped in Object.assign)
    this.getRollData = character.getRollData
    this.addLifeEvent = character.addLifeEvent
    this.addSibling = character.addSibling
    this.wound = character.wound
    this.heal = character.heal
  }
}