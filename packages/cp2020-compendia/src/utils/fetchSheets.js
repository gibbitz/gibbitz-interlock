// TODO: update tests

import { SHEETS_GET_OPTIONS } from '../constants/index.js'

const modelValues = (values, modeler) => values
  .map(row => modeler(row))
  .slice(1)

const createNeDBString = (values, modeler) =>
  modelValues(values, modeler)
    .map(row => JSON.stringify(row))
    .join('\n')

const createJSONString = (values, modeler) => JSON.stringify(
  modelValues(values, modeler)
)

/**
 * callback for handling output string
 *
 * @callback handleOutputString
 * @param {string} dbString JSON or other DB string to write to file
 * @param {string} outputPath Where to potentially write it or cache it for lookup
 */

/**
 * @description
 *
 * @param {Array} manifest an array of sheet data to fetch and transform data from a google sheet
 * @param {handleOutputString} callback used for writeFile function, but flexible for caching
 * @param {boolean} debug flag used for verbose messages in debugging
 */
export default (manifest, callback, debug = false) => {
  return Promise.all(
    manifest.map(({ uri, modeler, outfile }) => {
      debug && console.log(`====> fetching: ${uri}\n`)
      const {groups: { extension = '' } } = /.*\.(?<extension>.*)/.exec(outfile)
      debug && console.log(`${outfile} has ${extension} extension\n`)
      fetch(uri, SHEETS_GET_OPTIONS)
        .then((response) => response.json()
          .then((data) => {
            let dbString = ''
            if (data.error) {
              throw new Error(`${data.error.code} :: ${data.error.status} :: ${data.error.message}`)
            }
            switch (extension.toLowerCase()) {
              case 'json': // non-compendium spreadsheet data
                debug && !data.values && console.log(data)
                dbString = data.values
                  ? createJSONString(data.values, modeler)
                  : data.valueRanges && JSON.stringify(
                      data.valueRanges.reduce(
                        (sheets, {values, range}, index) => ({
                          // keys with spaces come with extra 's from the google API. replacing those here
                          [range.split('!')[0].replace(/\'/g, '')]: modelValues(values, modeler),
                          ...sheets
                        }),
                        {}
                      )
                    )
                break
              case 'lvl': // not sure what level db extension is...
                // or what to do with it so falling back to default
              case 'db': // NeDB Legacy conversion
              default:
                dbString = createNeDBString(data.values, modeler)
                break
            }
            // debug && console.log(`writing to ${outfile}\n${dbString}\\n`)
            callback(dbString, outfile)
          })
          .catch((err) => {
            if (err) {
              throw new Error(`${err.code} :: ${err.status} :: ${err.message}`)
            }
          })
        )
    })
  )
}