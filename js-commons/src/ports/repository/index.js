const sequelize = require('../sequelize')
const { fromSequelize } = require('./from-sequelize')

const connect = async (models) => {
  const seq = await sequelize.connect(models)

  const repo = fromSequelize(seq)

  return repo
}

module.exports = {
  connect
}
