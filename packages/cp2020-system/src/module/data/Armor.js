import { armorSchema } from './oufitSchema'
import { Outfit } from './Outfit'

export class Armor extends Outfit {
  static defineSchema() {
    return {
      ...armorSchema(),
      ...super.defineSchema()
    };
  }
}