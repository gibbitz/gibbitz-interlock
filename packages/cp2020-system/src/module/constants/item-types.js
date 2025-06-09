import { SYSTEM_NAME } from './system'
// system document types
export const ACTOR_DOCUMENT_TYPES = {
  EDGERUNNER: 'Edgerunner',
  NPC: 'NPC',
}
export const ITEM_DOCUMENT_TYPES = {
  AMMUNITION: 'Ammunition',
  ARMOR: 'Armor',
  CHIPWARE: 'Chipware',
  CURRENCY: 'Currency',
  CYBERDECK: 'Cyberdeck',
  CYBERWARE: 'Cyberware',
  MAGAZINE: 'Magazine',
  OUTFIT: 'Outfit',
  PROGRAM: 'Program',
  ROLE: 'Role',
  SKILL: 'Skill',
  UPGRADE: 'Upgrade',
  VEHICLE: 'Vehicle',
  WEAPON: 'Weapon'
}
export const DOCUMENT_TYPES = {
  ...ACTOR_DOCUMENT_TYPES,
  ...ITEM_DOCUMENT_TYPES
}
export const ITEM_I18N_BASE = `${SYSTEM_NAME}.items`
