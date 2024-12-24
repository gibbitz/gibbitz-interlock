import { readFile } from 'fs'

/**
 * import JSON file by path and return JSON object
 * @param {string} dataSource path to the JSON data from sheets
 */

const fetchData = (dataSource) => new Promise((resolve, reject) => {
  readFile(`${process.cwd() }/generator/${dataSource}`, (error, data) => {
    if (error) {
      reject(error)
    } else {
      resolve(JSON.parse(data))
    }
  })
})

/**
 * function to filter data from an array
 * @param {Array} data array of objects
 * @param {object} filters an object of key value pairs where keys in the data array
 * whose values match the filter will be used to select the random value
 */
const filterDataArray = (data, filters) => {
  let output = data
  if (filters && data) {
    const keys = []
    const filterkeys = Object.keys(filters)
    filterkeys.forEach((key) => {
      output = output.filter(row => {
        keys.push({ [key]: row[key] })
        return row[key]?.toLowerCase() === filters[key]?.toLowerCase()
      })
    })
    if (!output.length) {
      const newKey = keys[Math.floor(keys.length * Math.random())]
      console.error(`${JSON.stringify(filters)} did not produce any results displaying results for ${JSON.stringify(newKey) }`)
      output = filterDataArray(data, newKey)
    }
  }
  return output
}

/**
 * function to fetch and retrive a random value from a dataset in JSON
 * data from sheets will be either Arrays or Objects containing keys with Arrays as values
 * @param {string} dataSource path to the JSON data from sheets
 * @param {object} filters an object of key value pairs where keys in the data array
 * whose values match the filter will be used to select the random value
 * @param {string} tabName the name of a tab in a multi-tab sheet
 */
export default async (dataSource, filters, tabName) => {
  // TODO: rework for browser post express implementation
  let data = await fetchData(dataSource)
      .catch((error) => {
        throw error
      })

  // data is a single tab
  if (data.length) {
    data = filterDataArray(data, filters)

  // data has multiple tabs and tabName is specified
  } else if (tabName) {
    data = filterDataArray(data[tabName], filters)

  // if data has multiple tabs and no tab is specified make into sinlgle array
  } else {
    const tabs = Object.keys(data)
    let output = []
    tabs.forEach((tab) => {
      output = [ ...filterDataArray(data[tab], filters) ,...output]
    })
    data = output
  }

  // expand weighted tables
  if (data[0]?.weight) {
    data = data.reduce((output, inputRow) => {
      let i
      for (i=inputRow.weight; i > 0; i--) {
        output.unshift(inputRow)
      }
      return output
    }, [])
  }

  const choices = data.length
  return data[Math.floor(Math.random() * choices)]
}

