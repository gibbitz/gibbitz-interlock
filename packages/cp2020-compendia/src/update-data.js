/* This script is used by the build system
* to convert CSV files created in a spreadsheet application to Packs
*/
import { PACK_OUTPUT_PATH } from './constants/index.js'
import sheetManifest from './data-manifest.js'
import fetchSheets from './utils/fetchSheets.js'
import writeFiles from './utils/write-file.js'

fetchSheets(sheetManifest, writeFiles(PACK_OUTPUT_PATH), false)
