const writeDbs = require('../writeDbs.js').default
const fs = require('node:fs')
const { Buffer } = require('node:buffer')


const mockData = 'This is a string. There are others like it, but this one is mine.'
const mockDataStream = new Uint8Array(Buffer.from(mockData))
const mockOutputPath = 'this/is/a/test/path'
const mockOutFile = 'outfile.db'
const mockError = 'This is an Error Message'

const mockMkDirSync = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {})
const mockWriteFile = jest.spyOn(fs, 'writeFile').mockImplementation(() => {})

describe('writeDbs function.........', () => {
  writeDbs(mockOutputPath)(mockData, mockOutFile)

  test('creates folder at output path', () => {
    expect(mockMkDirSync).toHaveBeenCalledWith(mockOutputPath, { recursive: true })
  })

  test('writes the file in output folder', async () => {
    expect(mockWriteFile).toHaveBeenCalledWith(
      `${mockOutputPath}/${mockOutFile}`,  
      mockDataStream,
      expect.anything(),
      expect.anything()
    )
  })

  test('throws error if writeFile fails', () => {
    mockWriteFile.mockImplementation((_a, _b, _c, errorHandler) => {errorHandler(mockError)})
    expect(() => writeDbs(mockOutputPath)(mockData, mockOutFile)).toThrow(mockError)
  })

  test('doesn\'t throw if no error is passed', () =>{
    mockWriteFile.mockImplementation((_a, _b, _c, errorHandler) => {errorHandler(undefined)})
    expect(() => writeDbs(mockOutputPath)(mockData, mockOutFile)).not.toThrow(mockError)
  })
})