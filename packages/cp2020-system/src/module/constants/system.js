export const SYSTEM_NAME = 'cp2020'
export const SYSTEM_PROJECT_NAME = `gibbitz-interlock-${SYSTEM_NAME}`

export const DATA_IMPORT_BASE_PATH = `/systems/${SYSTEM_PROJECT_NAME}/data/`
export const GRAPHIC_ASSETS_IMPORT_BASE_PATH = `/systems/${SYSTEM_PROJECT_NAME}/assets/graphics/`
export const ICON_ASSETS_IMPORT_BASE_PATH = `/systems/${SYSTEM_PROJECT_NAME}/assets/icons/`

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

export const SKILLS_COMPENDIUM_PACK_NAME = `${SYSTEM_PROJECT_NAME}.skills`
export const SKILLS_COMPENDIUM_DATA_PATH = `${DATA_IMPORT_BASE_PATH}skills.json`
export const ARMOR_COMPENDIUM_PACK_NAME = `${SYSTEM_PROJECT_NAME}.armor`
export const ARMOR_COMPENDIUM_DATA_PATH = `${DATA_IMPORT_BASE_PATH}armor.json`

// TODO: Avoid using this if possible
// anti-pattern global CONFIG variable injection (see gibbitz-interlock-cp2020.js)
export const CP_2020 = {}
