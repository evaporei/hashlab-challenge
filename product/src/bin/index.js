const { startHttpServer } = require('js-commons/src/ports/http')
const setupDotenv = require('js-commons/src/config')
const { logger } = require('js-commons/src/logger')
const { createApp } = require('../app')

setupDotenv()

const main = async () => {
  const app = createApp()

  startHttpServer(app)

  logger.info('HTTP server started listening')
}

main()
  .catch(logger.error)
