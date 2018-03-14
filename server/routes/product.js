import { controller, get, post, put, log, del } from '../decorator/router'
import api from '../api'
import xss from 'xss'
import R from 'ramda'

@controller('/api')
export class WxController {
  @get('/products')
  @log
  async getProducts(ctx, next) {
    let {limit = 50} = ctx.query
    const data = await api.product.getProducts(limit)
    ctx.body = data
  }

  @get('/products/:_id')
  @log
  async getProduct(ctx, next) {
    const { params } = ctx
    const { _id } = params
    let data = await api.product.getProduct(_id)

    ctx.body = data
  }

  @post('/products')
  @log
  async postProducts(ctx, next) {
    const { body } = ctx.request
    let product = {
      title: xss(body.title),
      price: xss(body.price),
      intro: xss(body.intro),
      images: R.map(xss)(body.images),
      parameters: R.map(
        item => ({
          key: xss(item.key),
          value: xss(item.value)
        })
      )(body.parameters)
    }

    try {
      let postProduct = await api.product.save(product)
      ctx.body = {
        success: false,
        data: postProduct
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  @put('/products')
  @log
  async putProduct(ctx, next) {
    let body = ctx.request.body
    const { _id } = body
    let data = await api.product.getProduct(_id)

    if (!data) {
      return (ctx.body = {
        success: false,
        err: 'product note exist'
      })
    }
    data.title = xss(body.title)
    data.price = xss(body.price)
    data.intro = xss(body.intro)
    data.images = R.map(xss)(body.images)
    data.parameters = R.map(
      item => ({
        key: xss(item.key),
        value: xss(item.value)
      })
    )(body.parameters)
    try {
      data = await api.product.update(data)
      ctx.body = data
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  @del('/products/:_id')
  @log
  async delProducts(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) {
      return (ctx.body = {
        success: false,
        err: '_id is require'
      })
    }
    let data = await api.product.getProduct(_id)
    try {
      await api.product.del(data)
      ctx.body = {
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }
}
