const setupDotenv = require('./')

setupDotenv()

const sequelizeConfig = {
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  logging: false,
}

module.exports = sequelizeConfig
