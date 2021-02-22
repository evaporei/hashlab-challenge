const setupDotenv = require('js-commons/src/config')
const { createServer, startGrpcServer } = require('../ports/grpc')
const repository = require('js-commons/src/ports/repository')
const models = require('../ports/sequelize/models')

setupDotenv()

const main = async () => {
  const repo = await repository.connect(models)

  const server = createServer()

  await startGrpcServer(server)

  console.log('GRPC server started listening')
}

main()
  .catch(err => console.log('Failed to start GRPC server:', err))
