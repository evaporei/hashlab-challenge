const setupDotenv = require('../config')
const { createServer, startGrpcServer } = require('../ports/grpc')

setupDotenv()

const main = async () => {
  const server = createServer()

  await startGrpcServer(server)

  console.log('GRPC server started listening')
}

main()
  .catch(err => console.log('Failed to start GRPC server:', err))
