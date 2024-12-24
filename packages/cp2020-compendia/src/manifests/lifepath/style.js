import { getSheetUri } from "../../../../utils/uriUtils.js"
import {
  LIFEPATH_STYLE_SPREADSHEET_ID,
  LIFEPATH_ETHNICITY_SHEET_ID,
  LIFEPATH_AFFECTATIONS_SHEET_ID,
  LIFEPATH_HAIR_SHEET_ID,
  LIFEPATH_CLOTHES_SHEET_ID
} from '../../../../constants/index.js'

export const ethnicity = {
  uri: getSheetUri(LIFEPATH_STYLE_SPREADSHEET_ID, LIFEPATH_ETHNICITY_SHEET_ID),
  outfile: 'ethnicity.json',
  modeler: ([ weight, ethnicity, language ]) =>
    ({ weight, ethnicity, language })
}

export const affectations = {
  uri: getSheetUri(LIFEPATH_STYLE_SPREADSHEET_ID, LIFEPATH_AFFECTATIONS_SHEET_ID),
  outfile: 'affectations.json',
  modler: ([ affectation ]) => ({ affectation })
}

export const hair = {
  uri: getSheetUri(LIFEPATH_STYLE_SPREADSHEET_ID, LIFEPATH_HAIR_SHEET_ID),
  outfile: 'hair.json',
  modler: ([ hair ]) => ({ hair })
}

export const clothes = {
  uri: getSheetUri(LIFEPATH_STYLE_SPREADSHEET_ID, LIFEPATH_CLOTHES_SHEET_ID),
  outfile: 'clothes.json',
  modler: ([ clothes ]) => ({ clothes })
}