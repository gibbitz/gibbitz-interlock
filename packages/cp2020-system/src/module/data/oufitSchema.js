import { Cp2020Item } from '@documents/Cp2020Item';

const {
  HTMLField,
  SchemaField,
  NumberField,
  StringField,
  ArrayField,
  BooleanField,
  ForeignDocumentField
} = foundry.data.fields;

const requiredBlank = { required: true, blank: true }
const optionalBlank = { required: false, blank: true }
const requiredUninitialized = { required: true, initial: 0 }
const optionalUninitialized = { required: false, initial: 0 }
const requiredInitialOne = { required: true, initial: 1 }
const initialFalse = { initial: false }

export const metaSchema = () => ({
  flavor: new StringField(optionalBlank),
  description: new HTMLField(requiredBlank),
  notes: new HTMLField(requiredBlank),
  source: new StringField(requiredBlank),
  rollFormula: new StringField(optionalBlank)
})

export const econSchema = () => ({
  cost: new SchemaField({
    euroDollars: new NumberField(),
    newYen: new NumberField()
  }),
  availability: new StringField(requiredBlank)
})

export const encumberanceSchema = () => ({
  equipped: new BooleanField(initialFalse),
  weight: new NumberField(requiredUninitialized)
})

export const resiliencySchema = () => ({
  stoppingPower: new NumberField(requiredUninitialized),
  StructuralDamagePoints: new NumberField(requiredUninitialized),
})

export const consumableSchema = () => ({
  quantity: new NumberField(requiredUninitialized)
})

export const upgradeSchema = () => ({
  recipient: new StringField(requiredBlank), // document type
  property: new StringField(requiredBlank), // property to modify
  value: new NumberField(requiredUninitialized) // bonus (or penalty)
})

export const weaponSchema = () => ({
  type: new StringField(requiredBlank),
  skill: new StringField(requiredBlank),
  damage: new StringField(requiredBlank),
  concealability: new StringField(requiredBlank),
  accuracy: new NumberField(requiredUninitialized),
  upgradeIds: new ArrayField(new ForeignDocumentField(Item, { idOnly: true }))
})

export const rangedSchema = () => ({
  range: new NumberField(optionalUninitialized),
  magazine: new NumberField(optionalUninitialized),
  cartridge: new StringField(optionalBlank),
  rateOfFire: new ArrayField(new NumberField(requiredInitialOne))
})

export const explosiveSchema = () => ({
  blastRadius: new NumberField(optionalUninitialized)
})

export const ammoSchema = () => ({
  damage: new StringField(requiredBlank),
  rangedDamage: new ObjectField(),
  type: new StringField(requiredBlank),
  armorPiercing: new BooleanField(requiredUninitialized)
})

export const skillSchema = () => ({
  level: new NumberField(requiredUninitialized),
  chipLevel: new NumberField(requiredUninitialized),
  ip: new NumberField(requiredUninitialized),
  ipMultiplier: new NumberField(requiredInitialOne),
  roles: new ArrayField(new StringField()),
  specialAbility: new StringField(),
  stat: new StringField()
})

export const vehicleSchema = () => ({
  acceleration: new NumberField(requiredUninitialized),
  deceleration: new NumberField(requiredUninitialized),
  crew: new NumberField(requiredInitialOne),
  passengers: new NumberField(requiredUninitialized),
  range: new NumberField(requiredUninitialized),
  cargo: new NumberField(requiredUninitialized),
  maneuver: new NumberField(requiredUninitialized),
  topSpeed: new NumberField(requiredUninitialized)
})

export const cyberDeckSchema = () => ({
  speed: new NumberField(requiredUninitialized),
  cpu: new NumberField(requiredUninitialized),
  dataWalls: new NumberField(requiredUninitialized),
  codeGates: new NumberField(requiredUninitialized),
  memory: new NumberField(requiredUninitialized)
})

export const programSchema = () => ({
  strength: new NumberField(requiredUninitialized),
  memory: new NumberField(requiredUninitialized)
})

export const cyberWareSchema = () => ({
  equipped: new BooleanField({ initial: true }),
  location: new StringField(requiredBlank),
  humanityCost: new StringField(requiredBlank),
  humanityLoss: new NumberField(requiredUninitialized),
  surgicalCost: new StringField(requiredBlank),
  slots: new NumberField(requiredUninitialized),
  modifierType: new StringField(requiredBlank),
  modifies: new StringField(requiredBlank),
  modifier: new NumberField(requiredUninitialized)
})
