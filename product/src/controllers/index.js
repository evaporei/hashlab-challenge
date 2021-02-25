const errorPresenter = require('../presenters/error')

const resourceNotFound = (req, res) =>
  res.status(404).send(errorPresenter.fromMessage(`${req.path} resource not found`))

const methodNotAllowed = (req, res) =>
  res.status(405).send(errorPresenter.fromMessage(`${req.method} method is not allowed for ${req.path} resource`))

module.exports = {
  resourceNotFound,
  methodNotAllowed
}
