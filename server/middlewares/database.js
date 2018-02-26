import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import { resolve } from 'path'
import R from 'ramda'
import _ from 'lodash'

const models = resolve(__dirname, '../database/schema')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(resolve(models, file)))

const formatWikiCharacters = R.map(i => {
  i._id = i.nmId

  return i
})

var wikiCharacters = require('../database/json/wikiCharacters.json')
var wikiHouses = require('../database/json/wikiHouses.json')

wikiCharacters = formatWikiCharacters(wikiCharacters)

export const database = app => {
  mongoose.set('debug', true)
  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect('config.db', config.db)
  })

  mongoose.connection.on('error', err => {
    console.error('err', err)
  })

  mongoose.connection.once('open', async () => {
    console.log('Connect to MongoDB', config.db)
    const WikiHouse = mongoose.model('WikiHouse')
    const WikiCharacter = mongoose.model('WikiCharacter')

    let existWikiCharacter = await WikiCharacter.find({}).exec()
    if (!existWikiCharacter.length) WikiCharacter.insertMany(wikiCharacters)

    let existwikiHouses = await WikiHouse.find({}).exec()
    if (!existwikiHouses.length) WikiHouse.insertMany(wikiHouses)
  })
}