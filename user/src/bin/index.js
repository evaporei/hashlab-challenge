const setupDotenv = require('js-commons/src/config')
const { createGrpcServer, startGrpcServer } = require('js-commons/src/ports/grpc')
const repository = require('js-commons/src/ports/repository')
const { logger } = require('js-commons/src/logger')
const { loadProtos } = require('../proto-loader')
const models = require('../ports/sequelize/models')

setupDotenv()

const main = async () => {
  const repo = await repository.connect(models)

  const grpcServer = createGrpcServer()

  loadProtos(grpcServer, repo)

  await startGrpcServer(grpcServer)

  logger.info('GRPC server started listening')
}

main()
  .catch(logger.error)
