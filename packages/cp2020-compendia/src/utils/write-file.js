import { writeFile, mkdirSync } from 'node:fs'
import { Buffer } from 'node:buffer'

export default (outputPath) => (data, outfile) => {
  const outputUri = `${outputPath}/${outfile}`
  const dataBuffer = new Uint8Array(Buffer.from(data))
  const callback = err => {
    if (err) {
      throw err
    }
  }
  // create the path in case it isn't there
  mkdirSync(outputPath, { recursive: true })
  // write the DB
  writeFile(
    outputUri, 
    dataBuffer, 
    { flag: 'w'}, 
    callback
  )
}