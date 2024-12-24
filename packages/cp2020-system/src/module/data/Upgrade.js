import { upgradeSchema } from "./oufitSchema";
import { Outfit } from "./Outfit";

export class Upgrade extends Outfit {

  static defineSchema() {
    const schema = super.defineSchema();
    return {
      ...schema,
      ...upgradeSchema()
    }
  }

  prepareDerivedData() {
    return super.prepareDerivedData()
  }
}