import { Upgrade } from '@documents/item/Upgrade';
import { weaponSchema, rangedSchema, explosiveSchema } from "./oufitSchema";
import { Outfit } from "./Outfit";
import { determineWeaponRanges } from '@utils';

const { StringField, ObjectField } = foundry.data.fields;

export class Weapon extends Outfit {

  static defineSchema() {
    const schema = super.defineSchema();
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
    const { skill, damage, accuracy } = this;
    // TODO: determine if weapon is melee and add damage bonus roll string if so
    const strBonus = 0
    this.damageRoll = `${damage}+${strBonus}`
    this.hitRoll = `1d10+@skills.get(${skill}).total+${accuracy}`
    this.rangeDVs = determineWeaponRanges(this.range)
  }
}