import {getWechat} from '../wechat'

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
