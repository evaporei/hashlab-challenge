const Promise = require('bluebird')
const Sequelize = require('sequelize')
const config = require('../../config/sequelize')
const DatabaseError = require('../../errors/database')

const defaults = {
  define: {
    paranoid: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
}

const create = (models) => {
  const sequelize = new Sequelize({ ...defaults, ...config })

  const createModelInstance = (model) => ({
    model,
    instance: model.create(sequelize)
  })

  const associateModels = ({ model, instance }) => {
    if (model.associate) {
      model.associate(instance, sequelize.models)
    }
  }

  Object.values(models)
    .map(createModelInstance)
    .forEach(associateModels)

  return sequelize
}

const ensureIsConnected = (sequelize) => {
  const MAX_RETRIES = 10
  const RETRY_TIMEOUT = 1000

  const tryToConnect = (retry = 1) =>
    sequelize.authenticate()
      .catch((err) => {
        if (retry < MAX_RETRIES) {
          return Promise.delay(RETRY_TIMEOUT)
            .then(() => tryToConnect(retry + 1))
        }

        return Promise.reject(new DatabaseError(err))
      })

  return Promise.resolve(tryToConnect())
}

const connect = (models) =>
  Promise.resolve(create(models))
    .tap(ensureIsConnected)
    .tap(sequelize => sequelize.sync())

module.exports = {
  connect,
  create,
  ensureIsConnected
}
