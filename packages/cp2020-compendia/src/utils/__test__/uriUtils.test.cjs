const getSheetUri = require('../../../utils/uriUtils.js').getSheetUri
const getSpreadsheetUri = require('../../../utils/uriUtils.js').getSpreadsheetUri
const { GOOGLE_SHEETS_URL, SHEETS_API_KEY } = require('../constants.js')
const mockSpreadsheetId = 'mockSpreadsheetId'
const mockSheetId = 'mockSheetId'

describe('uriUtils functions ...............', () => {
  test('getSpreadsheetUri', () => {
    expect(getSpreadsheetUri(mockSpreadsheetId)).toEqual(
      `${GOOGLE_SHEETS_URL}v4/spreadsheets/${mockSpreadsheetId}?key=${SHEETS_API_KEY}`
    )
  })
  test('getSheetUri', () => {
    expect(getSheetUri(mockSpreadsheetId, mockSheetId)).toEqual(
      `${GOOGLE_SHEETS_URL}v4/spreadsheets/${mockSpreadsheetId}/values/${mockSheetId}?key=${SHEETS_API_KEY}`
    )
  })
})