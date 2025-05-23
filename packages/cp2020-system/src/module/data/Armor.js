import { armorSchema } from './oufitSchema'
import { Outfit } from './Outfit'

const avg = (...factors) =>
  factors.reduce(((acc, factor) => acc + factor), 0) / factors.length

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
    this.total = Math.round(avg(...this.locations.map(({total}) => total)))
    this.sp = Math.round(avg(...this.locations.map(({sp}) => sp)))
  }
}