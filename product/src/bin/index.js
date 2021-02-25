const { startHttpServer } = require('js-commons/src/ports/http')
const repository = require('js-commons/src/ports/repository')
const setupDotenv = require('js-commons/src/config')
const { logger } = require('js-commons/src/logger')
const { createApp } = require('../app')
const models = require('../ports/sequelize/models')

setupDotenv()

const main = async () => {
  const repo = await repository.connect(models)

  const app = createApp()

  startHttpServer(app)

  logger.info('HTTP server started listening')
}

main()
  .catch(logger.error)
