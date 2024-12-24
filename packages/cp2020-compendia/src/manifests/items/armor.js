import { getSheetUri } from "../../../../utils/uriUtils.js"
import {
  OUTFIT_SPREADSHEET_ID,
  OUTFIT_ARMOR_SHEET_ID
} from '../../../../constants/index.js'
const type = 'armor'
export const armor = {
  uri: getSheetUri(OUTFIT_SPREADSHEET_ID, OUTFIT_ARMOR_SHEET_ID),
  outfile: 'armor.json',
  modeler: ([
    name,
    _id,
    _category,
    _subcategory,
    cost,
    availability,
    weight,
    img,
    description,
    armorType,
    sp,
    locs,
    ev
  ]) => {
    console.log('importing Armor')
    const locations = locs.split(',').map(loc => loc.trim())
    const coverage = locations.map(location => ({
      location,
      sp,
      armorType
    }))
    return ({
      name,
      img,
      type,
      system: {
        cost,
        coverage,
        locations,
        description,
        sp,
        ev,
        armorType,
        availability,
        weight
      }
    })
  }
}