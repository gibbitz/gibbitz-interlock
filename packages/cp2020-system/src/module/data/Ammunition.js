import {
  metaSchema,
  econSchema,
  encumberanceSchema
} from './oufitSchema'

export class Ammunition extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const { weight } = encumberanceSchema()
    return {
      weight,
      ...metaSchema(),
      ...econSchema(),
      ...consumableSchema(),
      ...ammoSchema(),
      ...explosiveSchema()
    };
  }

  prepareDerivedData() {
    // TODO: Trigger remove if 0
    // TODO: Calculate weight by quantity
  }
}