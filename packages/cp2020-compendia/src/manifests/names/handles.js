import { getSheetUri } from "../../../../utils/uriUtils.js"
import {
  NAMES_SPREADSHEET_ID,
  NAMES_HANDLES_SHEET_ID
} from '../../../../constants/index.js'

export default
{
  uri: getSheetUri(NAMES_SPREADSHEET_ID, NAMES_HANDLES_SHEET_ID),
  outfile: 'handles.json',
  modeler: ([
    name,
    _type,
    gender,
    _language,
    weight,
    part
  ]) => ({
    name,
    gender,
    weight,
    part
  })
}