import { WEAPON_I18N_BASE } from './weapon-types'

export const NOT_CONCEALABLE = 'not'
export const LONG_COAT_CONCEALABLE = 'longCoat'
export const JACKET_CONCEALABLE = 'jacket'
export const POCKET_CONCEALABLE = 'pocket'

export const WEAPON_CONCEALABILITY_I18N_BASE = `${WEAPON_I18N_BASE}.conceal`

export const WEAPON_CONCEALABILITIES = [
  POCKET_CONCEALABLE,
  JACKET_CONCEALABLE,
  LONG_COAT_CONCEALABLE,
  NOT_CONCEALABLE
]
