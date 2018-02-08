import _ from 'lodash'
import rp from 'request-promise'
import { writeFileSync } from 'fs'
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

var _allCharacters = []

export const getAllCharacters = async (page = 1) => {
  var res = await rp(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`)
  var body = JSON.parse(res)
  _allCharacters = _.union(_allCharacters, body)

  if (body.length < 50) {
    console.log('over')
    writeFileSync('./server/crawler/data/allCharacters.json', JSON.stringify(_allCharacters, null, 2), 'utf8')
    console.log('over')
    return false
  } else {
    await sleep(1000)
    console.log(page)
    page++
    getAllCharacters(page)
  }
}
getAllCharacters()
