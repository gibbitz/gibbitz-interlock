import {
  SYSTEM_NAME,
  BTM_VALUES,
  CORE_STATS,
  DERIVED_STATS,
  DAMAGE_MODIFIER,
  HIT_LOCATIONS,
  WOUND_TYPES,
  SAVE_TYPES
} from "@constants";

import { rangeToDiscreteLevels } from '@utils';
import { determineHealthSave } from '@utils/determineHealthSave';

export class Edgerunner extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const {
      HTMLField,
      SchemaField,
      NumberField,
      ArrayField,
      StringField
    } = foundry.data.fields;

    const statNaturalNumberFieldOptions = {
      required: true,
      initial: 2, // minimum stat value is 2 in my homebrew
      integer: true
    }
    const statOpenNumberFieldOptions = {
      required: false,
      initial: 0,
      integer: true
    }
    const simpleStatFields = (fullStatName, abbrStatName) => ({
      name: new StringField({ initial: fullStatName, readonly: true }),
      abbr: new StringField({ initial: abbrStatName, readonly: true }),
      total: new NumberField(statOpenNumberFieldOptions),
      max: new NumberField({ required: true, initial: 10, integer: true }),
      scaleValue: new NumberField({ required: true, initial: 0, integer: true })
    })
    const rollableStatFields = () => ({
      rollFormula: new StringField({}),
      saveFormula: new StringField({})
    })
    const statFields = (fullStatName, abbrStatName) => ({
      ...simpleStatFields(fullStatName, abbrStatName),
      ...rollableStatFields(),
      natural: new NumberField(statNaturalNumberFieldOptions),
      modifier: new NumberField(statOpenNumberFieldOptions),
    })
    const simpleRollableStatFields = (fullStatName, abbrStatName) => ({
      ...simpleStatFields(fullStatName, abbrStatName),
      ...rollableStatFields()
    })
    const lifeEventFields = {
      year: new StringField(),
      event: new HTMLField(),
    }

    const familyFields = {
      ethnicity: new StringField(),
      language: new StringField(),
      parents: new StringField(),
      siblingCount: new NumberField(statOpenNumberFieldOptions),
      ranking: new StringField(),
      status: new StringField(),
      childhood: new StringField()
    }

    const siblingFields = {
      name: new StringField(),
      handle: new StringField(),
      gender: new StringField(),
      relativeAge: new StringField(), // TODO: drop-down younger|older|twin
      relationshipNotes: new HTMLField(),
    }

    const woundSchema = {
      location: new StringField(HIT_LOCATIONS),
      type: new StringField(WOUND_TYPES)
    }

    return {
      stats: new SchemaField({
        int: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.INT.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.INT.short`)
          )
        ),
        ref: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.REF.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.REF.short`)
          )
        ),
        tech: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.TECH.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.TECH.short`)
          )
        ),
        cl: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.CL.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.CL.short`)
          )
        ),
        attr: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.ATTR.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.ATTR.short`)
          )
        ),
        luck: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.LUCK.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.LUCK.short`)
          )
        ),
        ma: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.MA.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.MA.short`)
          )
        ),
        emp: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.EMP.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.EMP.short`)
          )
        ),
        body: new SchemaField(
          statFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.BODY.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.BODY.short`)
          )
        ),
        rep: new SchemaField(
          simpleRollableStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.REP.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.REP.short`)
          )
        ),
        hum: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.HUM.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.HUM.short`)
          )
        ),
        run: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.RUN.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.RUN.short`)
          )
        ),
        leap: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.LEAP.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.LEAP.short`)
          )
        ),
        ca: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.CA.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.CA.short`)
          )
        ),
        lift: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.LIFT.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.LIFT.short`)
          )
        ),
        thro: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.THRO.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.THRO.short`)
          )
        ),
        btm: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.BTM.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.BTM.short`)
          )
        ),
        dam: new SchemaField(
          simpleStatFields(
            game.i18n.localize(`${SYSTEM_NAME}.stats.DAM.long`),
            game.i18n.localize(`${SYSTEM_NAME}.stats.DAM.short`)
          )
        ),
      }),
      bio: new SchemaField({
        lifepath: new ArrayField(new SchemaField(lifeEventFields)),
        family: new SchemaField(familyFields),
        siblings: new ArrayField(new SchemaField(siblingFields))
      }),
      identity: new SchemaField({
        handle: new StringField(),
        givenName: new StringField(),
        role: new StringField(),
        age: new NumberField(),
        gender: new StringField(),
        sexualPreference: new StringField(),
        image: new StringField(),
        token: new StringField(),
        Style: new SchemaField({
          clothes: new StringField(),
          hair: new StringField(),
          affectations: new StringField()
        }),
        Motivations: new SchemaField({
          personalityTraits: new StringField(),
          feelAboutPeople: new StringField(),
          values: new SchemaField({
            person: new StringField(),
            possession: new StringField(),
            ideals: new StringField()
          })
        })
      }),
      health: new SchemaField({
        stunSave: new NumberField(),
        deathSave: new NumberField(),
        damage: new ArrayField(new SchemaField(woundSchema))
      })
    }
  }

  prepareDerivedData() {
    CORE_STATS.forEach((key) => {
      const statKey = key.toLowerCase()
      const { modifier, natural } = this.stats[statKey]
      this.stats[statKey].total = modifier + natural
      this.stats[statKey].scaleValue = this.stats[statKey].total
      this.stats[statKey].min = 1
      this.stats[statKey].rollFormula = `1d10x + @stats.${statKey}.total`
      this.stats[statKey].saveFormula = `1d10cs<@stats.${statKey}.total`
    })
    this.stats.rep.rollFormula = `1d10x + @stats.rep.total`
    this.stats.rep.saveFormula = `1d10cs<@stats.rep.total`
    this.stats.hum.max = 10 * 10
    this.stats.run.max = 10 * 3
    this.stats.run.min = 3
    this.stats.leap.max = this.stats.run.max / 4
    this.stats.leap.min = this.stats.run.min / 4
    this.stats.ca.max = 10 * 10
    this.stats.ca.min = 10
    this.stats.lift.max = this.stats.ca.max * 4
    this.stats.lift.min = this.stats.ca.min * 4
    this.stats.thro.max = 10 * 3
    this.stats.thro.min = 3
    this.stats.hum.total = this.stats.emp.total * 10
    this.stats.run.total = this.stats.ma.total * 3
    this.stats.leap.total = this.stats.run.total / 4
    this.stats.ca.total = this.stats.body.total * 10
    this.stats.lift.total = this.stats.ca.total * 4
    this.stats.thro.total = this.stats.body.total * 3
    DERIVED_STATS.forEach((key) => {
      const statKey = key.toLowerCase()
      this.stats[statKey].scaleValue = rangeToDiscreteLevels(
        this.stats[statKey].total,
        this.stats[statKey].max
      )
    })

    this.stats.btm.min = BTM_VALUES[0]
    this.stats.btm.max = BTM_VALUES[BTM_VALUES.length-1]
    this.stats.btm.scaleValue = this.stats.body.scaleValue
    this.stats.btm.total = this.stats.body.total < 11
      ? BTM_VALUES[this.stats.body.total]
      : -5

    this.stats.dam.min = DAMAGE_MODIFIER[0]
    this.stats.dam.max = DAMAGE_MODIFIER[DAMAGE_MODIFIER.length-1]
    this.stats.dam.scaleValue = this.stats.body.scaleValue
    this.stats.dam.total = this.stats.body.total < 15
      ? DAMAGE_MODIFIER[this.stats.body.total]
      : 8
    this.bio.family.siblingCount = this.bio.siblings?.length || 0
    this.health.stunSave = determineHealthSave(SAVE_TYPES.STUN, {system: this})
    this.health.deathSave = determineHealthSave(SAVE_TYPES.DEATH, {system: this})
  }
}