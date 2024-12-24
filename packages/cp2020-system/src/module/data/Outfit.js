import { metaSchema, econSchema, encumberanceSchema } from './oufitSchema'
export class Outfit extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...metaSchema(),
      ...econSchema(),
      ...encumberanceSchema()
    };
  }

  prepareDerivedData() {
    // TODO: determine weight by quantity
  }
}