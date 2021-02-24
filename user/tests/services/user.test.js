const userService = require('../../src/services/user')

describe('getUser', () => {
  test('with existing user', async () => {
    const userId = 'usr_ckljj7jy900001iofhtrehz8u'
    const existingUser = {
      id: userId,
      first_name: 'Jose',
      last_name: 'Maria',
      date_of_birth: '2021-02-24',
      created_at: '2021-02-24T18:22:05.175Z',
      updated_at: '2021-02-24T18:22:05.175Z',
      deleted_at: null
    }
    const expectedUser = {
      id: userId,
      first_name: 'Jose',
      last_name: 'Maria',
      date_of_birth: '2021-02-24'
    }

    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(existingUser))
    const fakeRepository = {
      User: {
        findOne: fakeFindOne
      }
    }
    const fakeCall = {
      request: { user_id: userId }
    }
    const fakeCallback = jest.fn()

    await userService(fakeRepository).getUser(fakeCall, fakeCallback)

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeFindOne.mock.calls[0]).toEqual([{
      where: { id: userId },
      raw: true,
    }])
    expect(fakeCallback.mock.calls.length).toBe(1)
    expect(fakeCallback.mock.calls[0]).toEqual([
      null,
      { user: expectedUser }
    ])
  })

  test('with NO existing user', async () => {
    const userId = 'usr_ckljj7jy900001iofhtrehz8u'

    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(null))
    const fakeRepository = {
      User: {
        findOne: fakeFindOne
      }
    }
    const fakeCall = {
      request: { user_id: userId }
    }
    const fakeCallback = jest.fn()

    await userService(fakeRepository).getUser(fakeCall, fakeCallback)

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeFindOne.mock.calls[0]).toEqual([{
      where: { id: userId },
      raw: true,
    }])
    expect(fakeCallback.mock.calls.length).toBe(1)
    expect(fakeCallback.mock.calls[0]).toEqual([
      null,
      { user: null }
    ])
  })

  test('when database errors', async () => {
    const userId = 'usr_ckljj7jy900001iofhtrehz8u'
    const expectedError = new Error('database error')

    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.reject(expectedError))
    const fakeRepository = {
      User: {
        findOne: fakeFindOne
      }
    }
    const fakeCall = {
      request: { user_id: userId }
    }
    const fakeCallback = jest.fn()

    try {
      await userService(fakeRepository).getUser(fakeCall, fakeCallback)
    } catch (error) {
      expect(error).toEqual(expectedError)
    }

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeFindOne.mock.calls[0]).toEqual([{
      where: { id: userId },
      raw: true,
    }])
    expect(fakeCallback.mock.calls.length).toBe(0)
  })
})
