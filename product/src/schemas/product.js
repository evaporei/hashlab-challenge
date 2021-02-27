const Joi = require('@hapi/joi')
const pagination = require('./pagination')

const list = pagination.keys({
  price: Joi.number().integer(),
  title: Joi.string(),
  description: Joi.string(),
})

module.exports = {
  list: Joi.object({ query: list }).unknown(true),
}
