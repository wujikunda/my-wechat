require('babel-core/register')({
  'presets': [
    'stage-3',
    'latest-node'
  ]
})

require('babel-polyfill')

var R = require('ramda')

var addFourNumbers = (a = 1, b = 2, c = 3, d = 4) => a + b + c + d

var curriedAddFourNumbers = R.map(addFourNumbers, [
  5,
  [1, 2, 3, 4]
])

console.log(curriedAddFourNumbers)
