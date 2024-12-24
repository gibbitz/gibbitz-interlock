import { SYSTEM_NAME } from './system'
// system document types
export const ACTOR_DOCUMENT_TYPES = {
  EDGERUNNER: 'Edgerunner',
  NPC: 'NPC',
}
export const ITEM_DOCUMENT_TYPES = {
  ARMOR: 'Armor',
  CYBERDECK: 'Cyberdeck',
  CYBERWARE: 'Cyberware',
  MAGAZINE: 'Magazine',
  OUTFIT: 'Outfit',
  PROGRAM: 'Program',
  SKILL: 'Skill',
  UPGRADE: 'Upgrade',
  VEHICLE: 'Vehicle',
  WEAPON: 'Weapon',
  AMMUNITION: 'Ammunition',
  CURRENCY: 'Currency'
}
export const DOCUMENT_TYPES = {
  ...ACTOR_DOCUMENT_TYPES,
  ...ITEM_DOCUMENT_TYPES
}
export const ITEM_I18N_BASE = `${SYSTEM_NAME}.items`
