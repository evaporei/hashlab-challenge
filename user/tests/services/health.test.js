const healthService = require('../../src/services/health')
const { ServingStatus } = require('../../src/ports/grpc/enums')

describe('check', () => {
  test('that service is up', async () => {
    const fakeCall = { request: {} }
    const fakeCallback = jest.fn()

    await healthService.check(fakeCall, fakeCallback)

    expect(fakeCallback.mock.calls.length).toBe(1)
    expect(fakeCallback.mock.calls[0]).toEqual([
      null,
      { status: ServingStatus.SERVING },
    ])
  })
})
