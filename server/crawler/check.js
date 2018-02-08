import R from 'ramda'
import { resolve } from 'path'
import {find} from 'lodash'
import { writeFileSync } from 'fs'
let character = require(resolve(__dirname, './data/allCharacters.json'))
let IMDbData = require(resolve(__dirname, './data/imdb.json'))

const findNameInApi = (item) => {
  return find(character, {
    name: item.name
  })
}

const findPlayedByInAPI = (item) => {
  return find(character, i => {
    return i.playedBy.includes(item.playedBy)
  })
}
const validData = R.filter(
  i => findNameInApi(i) && findPlayedByInAPI
)

const IMDb = validData(IMDbData)
console.log(IMDb.length)
writeFileSync(resolve(__dirname, './data/wikiCharacters.json'), JSON.stringify(IMDb, null, 2))