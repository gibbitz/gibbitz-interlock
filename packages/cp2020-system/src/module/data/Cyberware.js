import {
  metaSchema,
  econSchema,
  resiliencySchema,
  weaponSchema,
  rangedSchema,
  explosiveSchema,
  cyberWareSchema
} from './oufitSchema'
export class Cyberware extends foundry.abstract.TypeDataModel {
// extend ItemEconomics
  static defineSchema() {
    return {
      // ...metaSchema(),
      // ...econSchema(),
      // ...resiliencySchema(),
      // ...weaponSchema(),
      // ...rangedSchema(),
      // ...explosiveSchema(),
      // ...cyberWareSchema()
    };
  }
  prepareDerivedData() {
    // TODO: determine roll string for attack/defense
  }
}