const mapJoiError = joiErrorDetail => ({
  message: joiErrorDetail.message,
  path: joiErrorDetail.path
})

const validateSchema = (schema, data) => {
  const options = { abortEarly: false }

  const { value, error } = schema.validate(data, options)

  if (error) {
    error.details = error.details.map(mapJoiError)
    throw error
  }

  return value
}

module.exports = {
  mapJoiError,
  validateSchema
}
