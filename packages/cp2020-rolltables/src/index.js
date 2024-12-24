import express from 'express'
import getCharacterName from './getCharacterName'

const app = express()
const port = 3000

app.get('/api/character/generate/name', async (req, res) => {
  const characterName = await getCharacterName({
    language: req.query.language,
    gender: req.query.gender
  })
  res.send(characterName)
})

app.listen(port, () => {
  console.log(`Generator app listening on port ${port}`)
})