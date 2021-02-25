const Joi = require('@hapi/joi')

const pagination = Joi.object({
  page: Joi.number().integer(),
  count: Joi.number().integer()
})

module.exports = pagination
