const globalErrorHandler = require('../../src/middlewares/global-error-handler')

test('globalErrorHandler', () => {
  const fakeError = new Error('a lot of bad stuff')
  const fakeNext = jest.fn()
  const fakeSend = jest.fn()
  const fakeReq = {}
  const fakeRes = {
    status: statusCode => {
      expect(statusCode).toBe(500)
      return {
        send: fakeSend
      }
    }
  }

  globalErrorHandler(fakeError, fakeReq, fakeRes, fakeNext)

  expect(fakeSend.mock.calls.length).toBe(1)
  expect(fakeSend.mock.calls[0][0]).toEqual({
    errors: [{ message: 'Internal server error' }]
  })
  expect(fakeNext.mock.calls.length).toBe(1)
  expect(fakeNext.mock.calls[0][0]).toBe(undefined)
})
