import handleManifest from './manifests/names/handles.js'
import givenNamesManifests from './manifests/names/givens.js'
import skills from './manifests/items/skills.js'
import { explosives } from './manifests/items/weapons.js'
import { armor } from './manifests/items/armor.js'
import {
  ethnicity,
  affectations,
  hair,
  clothes
} from './manifests/lifepath/style.js'

export default [
  skills,
  explosives,
  armor,
  handleManifest,
  givenNamesManifests,
  ethnicity
]
