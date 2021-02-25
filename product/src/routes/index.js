const { resourceNotFound, methodNotAllowed } = require('../controllers')
const middlewares = require('../middlewares')
const productSchema = require('../schemas/product')
const productController = require('../controllers/product')

const setupRoutes = (app, repository) => {
  app.get('/health_check', (req, res) => res.sendStatus(200))
  app.all('/health_check', methodNotAllowed)

  app.get(
    '/product',
    middlewares.validation(productSchema.list),
    middlewares.catchAsyncError(productController.list(repository))
  )

  app.all('*', resourceNotFound)
}

module.exports = {
  setupRoutes
}
