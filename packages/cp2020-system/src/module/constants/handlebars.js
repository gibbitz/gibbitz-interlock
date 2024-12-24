import { SYSTEM_PROJECT_NAME } from './system'

const BASE_TEMPLATE_PATH = `systems/${ SYSTEM_PROJECT_NAME }/templates`
const globalPartials = [
  'cp2020-button',
  'cp2020-checkbox',
  'cp2020-editor',
  'cp2020-outfitHeader',
  'cp2020-importSidebar',
  'cp2020-input',
  'cp2020-output',
  'cp2020-select',
  'cp2020-textarea',
  'cp2020-arrayEditor',
  'cp2020-range',
  'cp2020-mannequin',
  'cp2020-progress',
  'cp2020-progressDetail',
]
const itemPartials = [
  'armor',
  'cyberdeck',
  'cyberware',
  'itemDetails',
  'outfit',
  'outfitEcon',
  'outfitSpecs',
  'program',
  'skill',
  'vehicle',
  'weapon'
]
const actorPartials = [
  'bio',
  'family',
  'health',
  'identity',
  'lifepath',
  'motivations',
  'portrait',
  'siblings',
  'status',
  'stat',
  'style',
  'values'
]

const generateGlobalPartialPath = (partialName) =>
  `${BASE_TEMPLATE_PATH}/partials/${partialName}-partial.hbs`
const generateItemPartialPath = (partialName) =>
  `${BASE_TEMPLATE_PATH}/item/parts/${partialName}-partial.hbs`
const generateActorPartialPath = (partialName) =>
  `${BASE_TEMPLATE_PATH}/actor/parts/${partialName}-partial.hbs`

export const HBS_TEMPLATES = [
  ...actorPartials.map(generateActorPartialPath),
  ...itemPartials.map(generateItemPartialPath),
  ...globalPartials.map(generateGlobalPartialPath)
]
export const HBS_TEMPLATE_HELPER_PARAMS = [
  ...actorPartials.map((partialName) => [partialName, generateActorPartialPath(partialName)]),
  ...itemPartials.map((partialName) => [partialName, generateItemPartialPath(partialName)]),
  ...globalPartials.map((partialName) => [partialName, generateGlobalPartialPath(partialName)])
]

export const HBS_ACTOR_TEMPLATE_PATH = `${BASE_TEMPLATE_PATH}/actor/edgerunner-sheet.hbs`
// types in template.json have to match Item Class names including case -- secret handshake
// in order to have consistent casing in hbs templates toLowerCase is needed
// logic added to direct to outfit if type is not a string/provided
export const GET_HBS_ITEM_TEMPLATE_PATH = (type) =>
  `${BASE_TEMPLATE_PATH}/item/${(type?.toLowerCase() || 'outfit')}-sheet.hbs`

export const DEFENSE_DIALOG_PATH = `${BASE_TEMPLATE_PATH}/dialogs/combat/defense.hbs`
export const DV_DIALOG_PATH = `${BASE_TEMPLATE_PATH}/dialogs/combat/dv.hbs`
export const OFFENSE_DIALOG_PATH = `${BASE_TEMPLATE_PATH}/dialogs/combat/offense.hbs`