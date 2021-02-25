const cors = require('cors')
const { httpLogger } = require('js-commons/src/logger')
const globalErrorHandler = require('./global-error-handler')
const catchAsyncError = require('./catch-async-error')
const validation = require('./validation')

const setupDefault = app => {
  app.use(cors())
  app.use(httpLogger)
}

module.exports = {
  setupDefault,
  globalErrorHandler,
  catchAsyncError,
  validation
}
