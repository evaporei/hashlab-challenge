const cors = require('cors')
const { httpLogger } = require('js-commons/src/logger')
const globalErrorHandler = require('./global-error-handler')

const setupDefault = app => {
  app.use(cors())
  app.use(httpLogger)
}

module.exports = {
  setupDefault,
  globalErrorHandler
}
