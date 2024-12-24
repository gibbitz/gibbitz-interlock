import { RANGE_MULTIPLIERS, TO_HIT_DV } from '@constants'
import { replaceStringTokens } from './replaceStringTokens'

export const determineWeaponRanges = (weaponRange) => Object.keys(TO_HIT_DV)
  .reduce((col, key, index) => ([
      {
        name: replaceStringTokens(game.i18n.localize(key), `< ${weaponRange * RANGE_MULTIPLIERS[index]}`),
        dv: TO_HIT_DV[key],
        range: weaponRange * RANGE_MULTIPLIERS[index]
      },
      ...col
    ]),
    []
  )
  .sort((a, b) => a.range > b.range ? 1 : -1)