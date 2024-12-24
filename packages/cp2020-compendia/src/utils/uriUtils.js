import {GOOGLE_SHEETS_URL, SHEETS_API_KEY} from '../constants/index.js'
const generateSheetsUri = (strings, spreadSheetId, sheetId = '') => {
  const [endpoint, sheetpath] = strings
  const glue = sheetpath.indexOf('?') > -1 ? '&' : '?'
  return `${GOOGLE_SHEETS_URL}${endpoint}${spreadSheetId}${sheetpath}${sheetId}${glue}key=${SHEETS_API_KEY}`
}

export const getSpreadsheetUri = (spreadsheetId) =>
  generateSheetsUri`v4/spreadsheets/${spreadsheetId}`
export const getSheetUri = (spreadsheetId, sheetId) =>
  generateSheetsUri`v4/spreadsheets/${spreadsheetId}/values/${sheetId}`
export const getSheetsUri = (spreadsheetId, sheetIds) =>
  generateSheetsUri`v4/spreadsheets/${spreadsheetId}/values:batchGet?${sheetIds.map(sheetId => 'ranges=' + sheetId).join('&')}`