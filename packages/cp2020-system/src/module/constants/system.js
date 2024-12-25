export const SYSTEM_NAME = 'cp2020-system'
export const SYSTEM_PROJECT_NAME = SYSTEM_NAME

export const GRAPHIC_ASSETS_IMPORT_BASE_PATH = `/systems/${SYSTEM_NAME}/assets/graphics/`
export const ICON_ASSETS_IMPORT_BASE_PATH = `/systems/${SYSTEM_NAME}/assets/icons/`

/** Token pattern used by replaceStringTokens
 * the number 1 is replaced with the index+1 of the parameters
 * then the pattern is replaced in the Localization string
*/
export const INITIAL_REPLACE_TOKEN = '${1}'

// draggable item selector allows overrides for freedom/consistency with
// interactive element markup
export const DRAG_SELECTOR = '.item-list .item'

// dataTransfer key used in drag/drop
// TODO: determine if this is a misunderstanding of the API from boilerplate
export const XFER_KEY = 'text/plain'

// socket emission types
export const EMIT_OPPOSED_ATTACK = 'EMIT_OPPOSED_ATTACK'
export const EMIT_REQUEST_ATTACK_DV = 'EMIT_REQUEST_ATTACK_DV'
export const EMIT_DEFENSE = 'EMIT_DEFENSE'
export const EMIT_CHECK = 'EMIT_CHECK'
export const EMIT_DV = 'EMIT_DV'
export const EMIT_ERROR = 'EMIT_ERROR'

// TODO: Avoid using this if possible
// anti-pattern global CONFIG variable injection (see gibbitz-interlock-cp2020.js)
export const CP_2020 = {}
