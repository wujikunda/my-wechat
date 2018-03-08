import { controller, get, post, put, log, convert } from '../decorator/router'
import api from '../api'

@controller('/wiki')
export class WxController {
  @get('/characters/:_id')
  @log
  async getCharacter (ctx, next) {
    const { params } = ctx
    const { _id } = params
    const data = await api.wiki.getCharacter(_id)
    ctx.body = data
  }

  @put('/characters/:_id')
  @log
  async putCharacter (ctx, next) {
    const { params } = ctx
    const { _id } = params
    const { body } = ctx.request

    let character = await api.wiki.putCharacter(_id, body)
    character = await character.save()

    ctx.body = character
  }

  @get('/characters')
  @log
  async getCharacters (ctx, next) {
    let { limit = 20 } = ctx.query
    let characters = await api.wiki.getCharacters(limit)
    ctx.body = characters
  }

  @get('/houses/:_id')
  @log
  async getHouse (ctx, next) {
    const { params } = ctx
    const { _id } = params

    let house = await api.wiki.getHouse(_id)

    ctx.body = house
  }

  @put('houses/:_id')
  @log
  async putHouse (ctx, next) {
    const { params } = ctx
    const { _id } = params
    const { body } = ctx.request
    let house = await api.wiki.putHouse(_id, body)

    house = await house.save()

    ctx.body = house
  }

  @get('/houses')
  @log
  async getHouses (ctx, next) {
    let houses = await api.wiki.getHouses()

    ctx.body = houses
  }
}
