const grpc = require('@grpc/grpc-js')

const createGrpcServer = () => new grpc.Server()

const startGrpcServer = server => new Promise(resolve =>
  server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    resolve()
  }))

module.exports = { createGrpcServer, startGrpcServer }
