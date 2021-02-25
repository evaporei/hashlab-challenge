const { resourceNotFound, methodNotAllowed } = require('../controllers')

const setupRoutes = (app) => {
  app.get('/health_check', (req, res) => res.sendStatus(200))
  app.all('/health_check', methodNotAllowed)

  app.all('*', resourceNotFound)
}

module.exports = {
  setupRoutes
}
