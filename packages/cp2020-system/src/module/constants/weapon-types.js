import { SYSTEM_NAME } from './system'

export const WEAPON_I18N_BASE = `${SYSTEM_NAME}.items.weapon`
export const WEAPON_TYPE_I18N_BASE = `${WEAPON_I18N_BASE}.types`

// corresponds with skillnames
export const MELEE = "melee"
export const PISTOL = "pistol"
export const SMG = "submachineGun"
export const RIFLE = "rifle"
export const BOW = "bow"
export const HEAVY_WEAPONS = "heavyWeapons"

export const WEAPON_TYPES = [
  HEAVY_WEAPONS,
  BOW,
  RIFLE,
  SMG,
  PISTOL,
  MELEE
]
