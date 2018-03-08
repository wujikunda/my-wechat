require('babel-core/register')({
  'presets': [
    'stage-3',
    'latest-node'
  ]
})

require('babel-polyfill')
var resolve = require('path').resolve
const r = path => resolve(__dirname, path)
var R = require('ramda')
// const MIDDLEWARES = ['database', 'router']
// this.useMiddleWares(this.app)(MIDDLEWARES)
var square = i => i + i
// function useMiddleWares(app) {
//   return R.map(R.compose(
//     R.map(i => i(app)),
//     square,
//     i => `${r('./middlewares')}/${i}`)
//   )
// }
// console.log(require(r('./server/middlewares/database')))
var k = 'database'
function useMiddleWares(app) {
  return R.map(R.compose(
    R.map(i => i + i),
    square,
    i => i + i
  ))
}
let app = i => i + i
console.log(useMiddleWares(app)(k))
