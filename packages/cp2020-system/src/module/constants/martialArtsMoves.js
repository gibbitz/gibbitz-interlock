import { SYSTEM_NAME } from './system'
const MA_MOVES_BASE_BATH = `${SYSTEM_NAME}.selects.martialArts`
export const STRIKE = 'strike'
export const PUNCH = 'punch'
export const KICK = 'kick'
export const DISARM = 'disarm'
export const SWEEP = 'sweep'
export const BLOCK = 'block'
export const DODGE = 'dodge'
export const GRAPPLE = 'grapple'
export const THROW = 'throw'
export const HOLD = 'hold'
export const CHOKE = 'choke'
export const ESCAPE = 'escape'
export const RAM = 'ram'
const MOVES = [
  STRIKE,
  PUNCH,
  KICK,
  DISARM,
  SWEEP,
  BLOCK,
  DODGE,
  GRAPPLE,
  THROW,
  HOLD,
  CHOKE,
  ESCAPE,
  RAM
]
export const MARTIAL_ARTS_MOVES_OPTIONS = MOVES.reduce(
  (col, move) => ({
    ...col,
    [`${MA_MOVES_BASE_BATH}.${move}`]: move
  }),
  {}
)
