const http = require('http')
const setupGracefulShutdown = require('./shutdown')

const startHttpServer = app => {
  const startedServer = http.createServer(app)

  startedServer.listen(process.env.HTTP_PORT)

  setupGracefulShutdown(startedServer)
}

module.exports = {
  startHttpServer,
}
