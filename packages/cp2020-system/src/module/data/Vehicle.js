import { vehicleSchema } from "./oufitSchema";
import { Outfit } from "./Outfit";

export class Vehicle extends Outfit{

  static defineSchema() {
    const schema = super.defineSchema();
    return {
      ...schema,
      ...vehicleSchema(),
      // devived values
    }
  }

  prepareDerivedData() {
    // TODO: Build the roll formula dynamically using string interpolation
  }
}