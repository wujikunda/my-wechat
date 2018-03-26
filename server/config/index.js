import _ from 'lodash'
import { resolve } from 'path'

const host = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const conf = require(resolve(__dirname, `./${env}.json`))

export default _.assign({
  env,
  host
}, conf)

// 测试号 appID: 'wx22798bb06a450c11',
// appSecret: '595b8ccf8903fd2ff1acdbd50ecd432a'
// EncodingAESKey: '0GesZMU4aGZnU9SyrAqDZDQQojthvtnrmD7qxOaGmEa'

// 星之所在 appID: 'wx4194e719f1d3811e',
// appSecret: '9e2656a06d75100d4e573e5c3f1e3694'
// EncodingAESKey: 'hwKMm8Orn89DqxHx1vFWIKllEHTeZsNAQKQVdlLXyPd'
