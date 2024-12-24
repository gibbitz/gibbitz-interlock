import { getSheetUri } from "../../../../utils/uriUtils.js"
import {
  OUTFIT_SPREADSHEET_ID,
  OUTFIT_EXPLOSIVES_SHEET_ID
} from '../../../../constants/index.js'

export const explosives = {
  uri: getSheetUri(OUTFIT_SPREADSHEET_ID, OUTFIT_EXPLOSIVES_SHEET_ID),
  outfile: 'explosives.json',
  modeler: ([
    product,
    category,
    subcategory,
    cost,
    availability,
    weight,
    qty,
    image,
    imageLink,
    details,
    skill,
    accuracy,
    conceal,
    magazine,
    cartridge,
    damage,
    duration,
    blastRadius,
    rof,
    rel,
    range,
    reference,
    origin
  ]) => ({
    product,
    category,
    subcategory,
    cost,
    availability,
    weight,
    qty,
    image,
    imageLink,
    details,
    skill,
    accuracy,
    conceal,
    magazine,
    cartridge,
    damage,
    duration,
    blastRadius,
    rof,
    rel,
    range,
    reference,
    origin
  })
}