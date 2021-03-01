const { loadPackageDefinition } = require('js-commons/src/ports/grpc')
const userService = require('../services/user')
const healthService = require('../services/health')

const loadProtos = (server, repository) => {
  const { user } = loadPackageDefinition('../../../../proto/user.proto')
  server.addService(user.UserService.service, userService(repository))

  const { health_check } = loadPackageDefinition('../../../../proto/health_check.proto')
  server.addService(health_check.HealthService.service, healthService)
}

module.exports = { loadPackageDefinition, loadProtos }
