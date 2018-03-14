import { controller, get, post, put, log, required } from '../decorator/router'
import api from '../api'

@controller('/admin')
export class AdminController {
  @post('login')
  @required({body: ['email', 'password']})
  async login(ctx, next) {
    const {email, password} = ctx.request.body
    const data = await api.admin.login(email, password)
    const {user, match} = data
    if (match) {
      if (user.role !== 'admin') {
        return (ctx.body = {
          success: false,
          err: 'not admin role'
        })
      }
      ctx.session.user = {
        _id: user.id,
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl
      }

      return (ctx.body = {
        success: true,
        data: {
          email: user.email,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl
        }
      })
    }
    return (ctx.body = {
      success: false,
      err: 'password err'
    })
  }

  @post('logout')
  async logout(ctx, next) {
    ctx.session = null

    ctx.body = {
      success: true
    }
  }

  @get('payments')
  async getPayments(ctx, next) {
    const data = await api.payment.fetchPayments()

    ctx.body = {
      success: true,
      data: data
    }
  }
}
