import maleMannequin from '@assets/graphics/male.svg'
import femaleMannequin from '@assets/graphics/female.svg'

const MALE = 'male'
const FEMALE = 'female'
const REPRESENTED_GENDERS = [FEMALE, MALE]

const mannequins = {
  [MALE]: maleMannequin,
  [FEMALE]: femaleMannequin
}

/**
 * function to get SVG graphic markup as a string to insert into HBS templates
 * based on a string containing a traditional gender that falls back to a
 * random choice
 * @async
 * @param {string} genderString
 * @returns {Promise<string>} svgMarkup
 */
export const fetchMannequinGraphic = (genderString = '') => {
  const lowerCaseGenderString = genderString?.toLowerCase()
  const cysGender = REPRESENTED_GENDERS.indexOf(lowerCaseGenderString) > -1
    && genderString.toLowerCase()
  const interpretedFemale = !cysGender
    && lowerCaseGenderString.indexOf(` ${FEMALE}`) > 0
    && FEMALE;
  const interpretedMale = !cysGender
    && lowerCaseGenderString.indexOf(` ${MALE}`) > 0
    && MALE;
  // binary -- if more genders are added to the list this will need to change
  const randomGender = REPRESENTED_GENDERS[Math.round(Math.random())]
  const gender = cysGender || interpretedFemale || interpretedMale || randomGender
  const svgMarkup = mannequins[gender]
  return svgMarkup
}