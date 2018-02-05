import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature } from '../controllers/wechat'

export const router = app => {
  const router = new Router()

  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  router.get('/wechat-signature', signature)
  // router.get('/upload', async (ctx, next) => {
  //   let mp = require('../wechat')
  //   let client = mp.getWechat()
  //   const data = await client.handle('batchMaterial', {})
  //   console.log(data)
  // })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
