const fetchSheets = require('../../../utils/fetchSheets.js').default

const mockFetch = jest.spyOn(global, 'fetch')
const mockCallback = jest.fn()
const mockConsoleLog = jest.spyOn(console, 'log')
  .mockImplementation(() => {})
const mockSheetUri = 'https://mock-sheet.url/full-path'
const mockOutFile = 'outfile.db'
const mockSheetRow = ['a', 'b', 'c']
const [ first, second, third ] = mockSheetRow
const mockSheet = {
  values: [
    mockSheetRow,
    mockSheetRow,
    mockSheetRow
  ]
}
const mockDbRecord = { first, second, third }
const mockDbString = mockSheet.values.map(() =>
  JSON.stringify(mockDbRecord)
).join('\n')
const mockModeler = ([ first, second, third ]) => ({
  first, second, third
})
const mockManifestShort = [
  {
    uri: mockSheetUri,
    modeler: mockModeler,
    outfile: mockOutFile
  }
]
const mockManifestLong = []

const mockFetchResult = (responseData) => () => Promise.resolve({
  json: () => Promise.resolve(responseData)
})


describe('fetchSheets .................', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('logs when debug flag is set', () => {
    mockFetch.mockImplementation(mockFetchResult(mockSheet))
    fetchSheets(mockManifestShort, mockCallback, true)
    expect(mockConsoleLog).toHaveBeenCalledTimes(mockManifestShort.length)
  })
  test('doesn\'t log when debug flag is unset', () => {
    mockFetch.mockImplementation(mockFetchResult(mockSheet))
    fetchSheets(mockManifestShort, mockCallback, false)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })
  test('creates expected DB content based on response', async () => {
    mockFetch.mockImplementation(mockFetchResult(mockSheet))
    await fetchSheets(mockManifestShort, mockCallback)
    expect(mockCallback).toHaveBeenCalledWith(mockDbString, mockOutFile)
  })
})