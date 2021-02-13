const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const userService = require('../../services/user')

const PROTO_PATH = __dirname + '/../../../../proto/user.proto'

const loadProtos = () => {
  const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
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

const createServer = () => {
  const server = new grpc.Server()

  const { user } = loadProtos()

  server.addService(user.UserService.service, userService)

  return server
}

const startGrpcServer = server => new Promise(resolve =>
  server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    resolve()
  }))

module.exports = { loadProtos, createServer, startGrpcServer }
