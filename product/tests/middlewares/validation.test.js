const Joi = require('@hapi/joi')
const validationMiddleware = require('../../src/middlewares/validation')

const requestSchema = Joi.object({
  body: Joi.object({
    a: Joi.string().required(),
    b: Joi.number()
  })
}).unknown(true)

describe('validationMiddleware', () => {
  test('when is valid', () => {
    const fakeNext = jest.fn()
    const fakeSend = jest.fn()
    const fakeBody = { a: 'john', b: 123 }
    const fakeReq = { body: fakeBody }
    const fakeRes = {
      status: jest.fn()
    }

    validationMiddleware(requestSchema)(fakeReq, fakeRes, fakeNext)

    expect(fakeSend.mock.calls.length).toBe(0)
    expect(fakeNext.mock.calls.length).toBe(1)
    expect(fakeNext.mock.calls[0][0]).toBe(undefined)
  })

  test('when is NOT valid', () => {
    const fakeNext = jest.fn()
    const fakeSend = jest.fn()
    const fakeBody = { b: true }
    const fakeReq = { body: fakeBody }
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(400)
        return {
          send: fakeSend
        }
      }
    }

    validationMiddleware(requestSchema)(fakeReq, fakeRes, fakeNext)

    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0][0]).toEqual({
      errors: [
        {
          message: '"body.a" is required',
          path: ['body', 'a']
        },
        {
          message: '"body.b" must be a number',
          path: ['body', 'b']
        }
      ]
    })
  })
})
