import { systemLog } from '@utils'
import { metaSchema, skillSchema } from './oufitSchema'
export class Skill extends foundry.abstract.TypeDataModel {
// extend ItemMeta
  static defineSchema() {
    const { NumberField, ArrayField } = foundry.data.fields;
    return {
      ...metaSchema(),
      // add skill schema
      ...skillSchema()
    };
  }
  prepareDerivedData() {
    systemLog(' SKILL prepareDerivedData | ', this)
    const rollFormula = `1d10x + @stats.${this.stat?.toLowerCase()}.total + ${this.level}`
    // TODO:
    // detect combat sense and other modifier skills
    // check character for equipped modifier outfit and cyberware
    // apply if equipped
    // notify if not equipped at time of roll
    this.rollFormula = rollFormula
    this.flavor = this.flavor
      || `[${game.i18n.localize('cp2020.stats.'+this.stat+'.long')} ${game.i18n.localize('cp2020.items.skill.flavor')}] ${this.parent.name}`
  }
}