const setupDotenv = require('js-commons/src/config')
const { createGrpcServer, startGrpcServer } = require('js-commons/src/ports/grpc')
const repository = require('js-commons/src/ports/repository')
const { loadProtos } = require('../proto-loader')
const models = require('../ports/sequelize/models')

setupDotenv()

const main = async () => {
  const repo = await repository.connect(models)

  const grpcServer = createGrpcServer()

  loadProtos(grpcServer)

  await startGrpcServer(grpcServer)

  console.log('GRPC server started listening')
}

main()
  .catch(err => console.log('Failed to start GRPC server:', err))
