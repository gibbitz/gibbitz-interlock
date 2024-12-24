import getRandomValue from "./utils/getRandomValue"
import { getEthnicityAndLanguage } from "./getEthnicityAndLanguage"
import { getGender } from './getGender'
import { generateHandle } from "./generateHandle"


export default async ({ language: lang, gender: sex } = {}) => {
  // get gender
  const { gender, genderFilter } = getGender(sex)

  // get Ethnicity & language
  const { ethnicity, language, primaryLanguage, motherLanguage } = await getEthnicityAndLanguage(lang)
  console.log({ ethnicity, language, primaryLanguage, motherLanguage })
  // get First and last names
  const firstNameFilter = { ...genderFilter, type: 'First Name' }
  const lastNameFilter = { type: 'Last Name' }
  const first = await getRandomValue('data/master-names.json', firstNameFilter, motherLanguage || primaryLanguage)
  const last = await getRandomValue('data/master-names.json', lastNameFilter, primaryLanguage)

  // get handle
  const handle = await generateHandle(genderFilter)

  // return values
  return {
    ethnicity,
    language,
    gender,
    name: {
      full: `${last.name}, ${first.name}`,
      first: first.name,
      last: last.name,
      handle
    }
  }
}
