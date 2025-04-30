import { armorSchema } from './oufitSchema'
import { Outfit } from './Outfit'

export class Armor extends Outfit {
  static defineSchema() {
    return {
      ...armorSchema(),
      ...super.defineSchema()
    };
  }
  prepareDerivedData() {
    this.locations.forEach((data, index) => {
      this.locations[index].total = Math.max(0, data.sp - data.ablation)
    })
  }
}