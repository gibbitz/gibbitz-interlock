import getRandomValue from './utils/getRandomValue'

export const generateHandle = async (genderFilter) => {
  const first = await getRandomValue('data/handles.json', genderFilter)
  const nounFilter = { part: 'noun' }
  let extra
  switch (first.part) {
    case 'prefix':
      extra = await getRandomValue('data/handles.json', { ...genderFilter, ...nounFilter })
      return `${first.name} ${extra.name}`
    case 'suffix':
      extra = await getRandomValue('data/handles.json', { ...genderFilter, ...nounFilter })
      return `${extra.name} ${first.name}`
    case 'noun':
    default:
      return first.name
  }
}
