const createRepositoryModel = sequelizeModel => ({
  create: (...args) => sequelizeModel.create(...args),
  findOne: (...args) => sequelizeModel.findOne(...args),
  findAll: (...args) => sequelizeModel.findAll(...args),
  update: (...args) => sequelizeModel.update(...args),
  destroy: (...args) => sequelizeModel.destroy(...args)
})

const fromSequelize = sequelize =>
  Object.entries(sequelize.models)
    .reduce((repository, [modelName, model]) => ({
      ...repository,
      [modelName]: createRepositoryModel(model)
    }), {})

module.exports = {
  createRepositoryModel,
  fromSequelize
}
