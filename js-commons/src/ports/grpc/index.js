const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const createGrpcServer = () => new grpc.Server()

const startGrpcServer = server => new Promise(resolve =>
  server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    resolve()
  }))

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

const createCredentials = () => grpc.credentials.createInsecure()

module.exports = {
  createGrpcServer,
  startGrpcServer,
  loadPackageDefinition,
  createCredentials,
}
