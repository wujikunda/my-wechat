import mongoose from 'mongoose'

const WikiCharacter = mongoose.model('WikiCharacter')
const WikiHouse = mongoose.model('WikiHouse')

export async function getCharacter(_id) {
  let character = await WikiCharacter.findById(_id).exec()
  return character
}

export async function putCharacter(_id, body) {
  let character = await WikiCharacter.findById(_id).exec()

  character.sections = body.sections
  character.profile = body.profile
  character.name = body.name
  character.cname = body.cname
  character.playedBy = body.playedBy
  character.images = body.images

  character = await character.save()

  return character
}

export async function getCharacters(limit) {
  let characters = await WikiCharacter
    .find({})
    .limit(Number(limit))
    .exec()

  return characters
}
export async function getHouse(_id) {
  if (!_id) return ('_id is required')

  let house = await WikiHouse
    .findById(_id)
    .populate({
      path: 'swornMembers.character',
      select: 'name cname profile nmId'
    })
    .exec()

  return house
}
export async function putHouse(_id, body) {
  let house = await WikiHouse.findById(_id).exec()

  house.sections = body.sections
  house.swornMembers = body.swornMembers
  house.words = body.words
  house.name = body.name
  house.cname = body.cname

  house = await house.save()

  return house
}
export async function getHouses() {
  let houses = await WikiHouse
    .find({})
    .populate({
      path: 'swornMembers.character',
      select: '_id name cname profile'
    })
    .exec()

  return houses
}
