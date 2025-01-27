import { SYSTEM_NAME } from './system'
const AUTO_FIRE_BASE_PATH = `${SYSTEM_NAME}.dialogs.checks.selects.autoFire`

export const DIRECT_FIRE = 'direct'
export const SUPPRESSIVE_FIRE = 'spray'
export const AUTO_FIRE_OPTIONS = {
  [`${AUTO_FIRE_BASE_PATH}.direct`]: DIRECT_FIRE,
  [`${AUTO_FIRE_BASE_PATH}.spray`]: SUPPRESSIVE_FIRE
}
