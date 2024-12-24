export const GENDERS = {
  'Male': 'Male',
  'Female': 'Female',
  'Male presenting Female': 'Female',
  'Female presenting Male': 'Male',
  'Androgynous': 'all'
}

export const WEIGHTED_GENDERS = (() => {
  const cisWeight = 6
  let probableGenders = Object.keys(GENDERS)
  probableGenders = probableGenders.reduce((collector, item, index) => {
    for (let i = 0; i < (index < 2 ? cisWeight : 1); i++) {
      collector.push(item)
    }
    return collector
  }, [])
  return probableGenders
})()

export const getGender = (sex) => {
  // get gender
  const gender = sex
    ? Object.keys(GENDERS).filter((gender) => gender.toLowerCase() === sex.toLowerCase())[0]
    : WEIGHTED_GENDERS[[Math.floor(Math.random() * WEIGHTED_GENDERS.length)]]
  const genderKey = GENDERS[gender]
  const genderFilter = genderKey !== GENDERS.Androgynous && { gender: genderKey }
  return {
    gender,
    genderFilter
  }
}
