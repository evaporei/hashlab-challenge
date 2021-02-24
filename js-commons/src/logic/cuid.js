const cuid = require('cuid')

const cuidWithPrefix = (prefix = '') =>
  () => `${prefix}${cuid()}`

module.exports = cuidWithPrefix
