import { systemLog } from '@utils'
import { metaSchema, roleSchema } from './oufitSchema'

export class Role extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...metaSchema(),
      // add role schema
      ...roleSchema()
    };
  }
  prepareDerivedData() {
    systemLog(' ROLE prepareDerivedData | ', this)
  }
}
