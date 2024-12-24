import { getSheetsUri } from "../../../../utils/uriUtils.js"
import {
  NAMES_SPREADSHEET_ID,
  NAMES_LANGUAGES_SHEET_IDS
} from '../../../../constants/index.js'

export default {
  uri: getSheetsUri(NAMES_SPREADSHEET_ID, NAMES_LANGUAGES_SHEET_IDS),
  outfile: 'master-names.json',
  modeler: ([
    name,
    type,
    gender,
    language,
    weight
  ]) => ({
    name,
    type,
    gender,
    language,
    weight
  })
}
