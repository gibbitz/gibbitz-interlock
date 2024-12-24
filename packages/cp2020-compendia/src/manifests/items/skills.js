import { getSheetUri } from "../../../../utils/uriUtils.js"
import {
  SKILL_SPREADSHEET_ID,
  SKILL_ALL_SHEET_ID
} from '../../../../constants/index.js'
const type = 'skill'
export default {
  uri: getSheetUri(SKILL_SPREADSHEET_ID, SKILL_ALL_SHEET_ID),
  outfile: 'skills.json',
  modeler: ([
    skillName,
    attribute,
    modifier,
    ipMultiplier,
    specialAbility,
    description,
    notes,
    careerSkill
  ]) => ({
    name: skillName,
    type,
    system: {
      stat: attribute,
      modifier,
      ipMultiplier,
      specialAbility,
      description,
      notes,
      roles: careerSkill?.split('|')
    }
  })
}