import { Upgrade } from '@documents/item/Upgrade'
import { MELEE } from '@constants'
import { weaponSchema, rangedSchema, explosiveSchema } from "./oufitSchema"
import { Outfit } from "./Outfit"
import { determineWeaponRanges } from '@utils'

const { StringField, ObjectField } = foundry.data.fields

export class Weapon extends Outfit {

  static defineSchema() {
    const schema = super.defineSchema()
    return {
      ...schema,
      ...weaponSchema(),
      ...rangedSchema(),
      ...explosiveSchema(),
      // devived values
      damageRoll: new StringField({ blank: true }),
      hitRoll: new StringField({ blank: true }),
      upgrades: new ObjectField()
    }
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const { type, damage, accuracy } = this
    const skill = type ? type : MELEE
    // TODO: determine if weapon is melee and add damage bonus roll string if so
    const strBonus = type === MELEE
      ? '@stats.get(dam).total'
      : 0
    const ownerHasSkill = this.parent.parent.collections.skills?.get(skill)
    const rollBase = ownerHasSkill
      ? `@skills.get(${skill}).rollFormula`
      : '1d10 + @stats.get(ref).total'
    this.damageRoll = `${damage} + ${strBonus}`
    this.hitRoll = `${rollBase} + ${accuracy}`
    this.rangeDVs = determineWeaponRanges(this.range)
  }
}