const Joi = require('@hapi/joi')
const { mapJoiError, validateSchema } = require('../../src/schemas')

test('mapJoiError', () => {
  const fakeJoiError = {
    name: 'ValidationError',
    isJoi: true,
    details: [
      {
        message: 'body.x is required',
        path: ['body', 'x'],
        type: 'any.required',
        context: { /* ... */ }
      }
    ]
  }
  expect(mapJoiError(fakeJoiError.details[0])).toEqual({
    message: 'body.x is required',
    path: ['body', 'x']
  })
})

describe('validateSchema', () => {
  test('when an error happens', () => {
    const schema = Joi.object({
      a: Joi.string().required(),
      b: Joi.number()
    })
    const invalidData = {}

    try {
      validateSchema(schema, invalidData)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toEqual('"a" is required')
      expect(error.details).toEqual([{
        message: '"a" is required',
        path: ['a']
      }])
      expect(error).toBeInstanceOf(Joi.ValidationError)
    }
  })

  test('when an error does NOT happen', () => {
    const schema = Joi.object({
      a: Joi.string().required(),
      b: Joi.number()
    })
    const validData = {
      a: 'bar'
    }

    expect(validateSchema(schema, validData)).toEqual(validData)
  })
})
