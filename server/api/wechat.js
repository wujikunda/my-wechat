import { getWechat, getOAuth } from '../wechat'
import mongoose from 'mongoose'
const User = mongoose.model('User')
const wechatApi = getWechat()

export async function getSignatureAsync(url) {
  const data = await wechatApi.fetchAccessToken()
  const token = data.access_token
  const ticketData = await wechatApi.fetchTicket(token)
  const ticket = ticketData.ticket

  let params = wechatApi.sign(ticket, url)
  params.appId = wechatApi.appID

  return params
}

export function getAuthorizeURL(...args) {
  const oauth = getOAuth()

  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode(code) {
  const oauth = getOAuth()

  const data = await oauth.fetchAccessToken(code)
  const openid = data.openid
  const user = await oauth.getUserInfo(data.access_token, openid)
  console.log('getUserByCode data', data)
  const existUser = await User.findOne({openid: openid}).exec()
  console.log('existUser', existUser)
  if (!existUser) {
    let newUser = new User({
      openid: openid,
      avatarUrl: user.avatarUrl,
      headimgurl: user.headimgurl,
      nickname: user.nickname,
      address: user.address,
      province: user.province,
      country: user.country,
      city: user.city,
      sex: user.sex
    })
    await newUser.save()
  }
  return user
}
