const { loadPackageDefinition } = require('js-commons/src/ports/grpc')
const userService = require('../services/user')

const loadProtos = (server, repository) => {
  const { user } = loadPackageDefinition('../../../../proto/user.proto')
  server.addService(user.UserService.service, userService(repository))
}

module.exports = { loadPackageDefinition, loadProtos }
