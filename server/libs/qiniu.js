import qiniu from 'qiniu'
import config from '../config'
import { exec } from 'shelljs'

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

const bucket = config.qiniu.bucket

// const bucketManager = new qiniu.rs.Client()
// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
// var config = new qiniu.conf.Config()
// config.useHttpsDomain = true
// config.zone = qiniu.zone.Zone_z2
// var bucketManager = new qiniu.rs.BucketManager(mac, config)
const mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY)
let options = {
  scope: bucket
}
let putPolicy = new qiniu.rs.PutPolicy(options)
// const uptoken = (key) => new qiniu.rs.PutPolicy(`${bucket}:${key}`).token()
const uptoken = (key) => putPolicy.uploadToken(mac)
const uploadFile = (uptoken, key, localFile) => new Promise((resolve, reject) => {
  var extra = new qiniu.io.PutExtra()

  qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {
    if (!err) {
      console.log('上传成功')
      resolve()
    }

    reject(err)
  })
})

// 因为七牛抓取互联网资源这个 node SDK 有坑，所以直接用 qshell，所以使用前需要全局安装
// npm i qshell -g
// 然后配置账号
// qshell account <你的AK> <你的SK>
const fetchImage = async (url, key) => new Promise((resolve, reject) => {
  let bash = `qshell fetch ${url} ${bucket} ${key}`

  let child = exec(bash, { async: true })
  child.stdout.on('data', data => {
    resolve(data)
  })

  // exec(bash, (code, stdout, stderr) => {
  //   if (stderr) return reject(stderr)
  //   if (stdout === 'Fetch error, 504 , xreqid:') return reject(stdout)

  //   resolve(stdout)
  // })
})

export default {
  fetchImage,
  uptoken,
  uploadFile
}
