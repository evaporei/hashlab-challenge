const cors = require('cors')
const { httpLogger } = require('js-commons/src/logger')

const setupDefault = app => {
  app.use(cors())
  app.use(httpLogger)
}

module.exports = { setupDefault }
