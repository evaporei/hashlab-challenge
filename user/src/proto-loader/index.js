const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const userService = require('../services/user')

const loadPackageDefinition = (protoPath) => {
  const packageDefinition = protoLoader.loadSync(
    `${__dirname}/${protoPath}`,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }
  )

  return grpc.loadPackageDefinition(packageDefinition)
}

const loadProtos = (server) => {
  const { user } = loadPackageDefinition('../../../../proto/user.proto')
  server.addService(user.UserService.service, userService)
}

module.exports = { loadPackageDefinition, loadProtos }
