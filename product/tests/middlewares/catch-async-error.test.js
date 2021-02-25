const catchAsyncError = require('../../src/middlewares/catch-async-error')

describe('catchAsyncError', () => {
  test('when NO error occurs', async () => {
    const fakeController = jest.fn()
      .mockReturnValueOnce(Promise.resolve())
    const fakeReq = {}
    const fakeRes = {}
    const fakeNext = jest.fn()

    await catchAsyncError(fakeController)(fakeReq, fakeRes, fakeNext)

    expect(fakeController.mock.calls.length).toBe(1)
    expect(fakeController.mock.calls[0]).toEqual([fakeReq, fakeRes])
    expect(fakeNext.mock.calls.length).toBe(0)
  })

  test('when an error occurs', async () => {
    const fakeControllerError = new Error('things exploded')
    const fakeController = jest.fn()
      .mockReturnValueOnce(Promise.reject(fakeControllerError))
    const fakeReq = {}
    const fakeRes = {}
    const fakeNext = jest.fn()

    try {
      await catchAsyncError(fakeController)(fakeReq, fakeRes, fakeNext)
    } catch (error) {
      expect(error).toEqual(fakeControllerError)
    }

    expect(fakeController.mock.calls.length).toBe(1)
    expect(fakeController.mock.calls[0]).toEqual([fakeReq, fakeRes])
    expect(fakeNext.mock.calls.length).toBe(1)
    expect(fakeNext.mock.calls[0][0]).toEqual(fakeControllerError)
  })
})
