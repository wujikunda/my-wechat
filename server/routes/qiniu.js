import { controller, get, post, put, log } from '../decorator/router'
import qiniu from '../libs/qiniu'

@controller('/qiniu')
export class QiniuController {
  @get('token')
  @log
  async qiniuToken (ctx, next) {
    const { key } = ctx.query
    const token = qiniu.uptoken(key)
    ctx.body = {
      success: true,
      data: {
        key: key,
        token: token
      }
    }
  }
}
