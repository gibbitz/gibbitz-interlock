import { systemLog } from '@utils'
import { SYSTEM_NAME } from '@constants'
import { econSchema, encumberanceSchema } from './oufitSchema'
import { Skill } from './Skill'

export class Chipware extends Skill {
  static defineSchema() {
    const superSchema = super.defineSchema()
    return {
      // add physical schemas
      ...econSchema(),
      ...encumberanceSchema(),
      // to skill schema
      ...superSchema
    };
  }
  prepareDerivedData() {
    systemLog(' CHIPWARE prepareDerivedData | ', this)
    // TODO:
    // detect combat sense and other modifier skills
    // check character for equipped modifier outfit and cyberware
    // apply if equipped
    // notify if not equipped at time of roll

    // hardwired isChipped value
    this.isChipped = true

    this.rollFormula = `1d10x + @stats.${this.stat?.toLowerCase()}.total + ${this.level}`
    const longStatLabel = `${SYSTEM_NAME}.stats.${this.stat}.long`
    const flavorLabel = `${SYSTEM_NAME}.items.skill.flavor`
    this.flavor = this.flavor
      || `[${game.i18n.localize(longStatLabel)} ${game.i18n.localize(flavorLabel)}] ${this.parent.name}`
  }
}