const { resourceNotFound, methodNotAllowed } = require('../../src/controllers')

test('resourceNotFound', () => {
  const fakeSend = jest.fn()
  const fakeReq = { path: '/non_existing' }
  const fakeRes = {
    status: statusCode => {
      expect(statusCode).toBe(404)
      return {
        send: fakeSend,
      }
    },
  }

  resourceNotFound(fakeReq, fakeRes)

  expect(fakeSend.mock.calls.length).toBe(1)
  expect(fakeSend.mock.calls[0][0]).toEqual({
    errors: [{ message: '/non_existing resource not found' }],
  })
})

test('methodNotAllowed', () => {
  const fakeSend = jest.fn()
  const fakeReq = { path: '/users', method: 'PATCH' }
  const fakeRes = {
    status: statusCode => {
      expect(statusCode).toBe(405)
      return {
        send: fakeSend,
      }
    },
  }

  methodNotAllowed(fakeReq, fakeRes)

  expect(fakeSend.mock.calls.length).toBe(1)
  expect(fakeSend.mock.calls[0][0]).toEqual({
    errors: [{ message: 'PATCH method is not allowed for /users resource' }],
  })
})
