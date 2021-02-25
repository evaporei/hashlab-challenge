const productController = require('../../src/controllers/product')

describe('list', () => {
  test('when there are products', async () => {
    const existingProducts = [
      {
        id: 'prd_cklk9ynb1000001rt6nzydsfv',
        price: 10000,
        title: 'Bike',
        description: 'cool bike',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: 'prd_cklk9ynb2000101rt289h81ox',
        price: 5000,
        title: 'Video-game',
        description: 'bad video-game, it\'s broken',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
    ]
    const expectedProducts = [
      {
        id: 'prd_cklk9ynb1000001rt6nzydsfv',
        price: 10000,
        title: 'Bike',
        description: 'cool bike',
      },
      {
        id: 'prd_cklk9ynb2000101rt289h81ox',
        price: 5000,
        title: 'Video-game',
        description: 'bad video-game, it\'s broken',
      },
    ]

    const fakeFindAll = jest.fn().mockReturnValueOnce(Promise.resolve(existingProducts))
    const fakeRepository = {
      Product: {
        findAll: fakeFindAll,
      }
    }

    const fakeReq = {}
    const fakeSend = jest.fn()
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(200)
        return {
          send: fakeSend
        }
      }
    }

    await productController.list(fakeRepository)(fakeReq, fakeRes)

    expect(fakeFindAll.mock.calls.length).toBe(1)
    expect(fakeFindAll.mock.calls[0]).toEqual([{
      raw: true
    }])
    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
  })

  test('when there are NO products', async () => {
    const existingProducts = []
    const expectedProducts = []

    const fakeFindAll = jest.fn().mockReturnValueOnce(Promise.resolve(existingProducts))
    const fakeRepository = {
      Product: {
        findAll: fakeFindAll,
      }
    }

    const fakeReq = {}
    const fakeSend = jest.fn()
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(200)
        return {
          send: fakeSend
        }
      }
    }

    await productController.list(fakeRepository)(fakeReq, fakeRes)

    expect(fakeFindAll.mock.calls.length).toBe(1)
    expect(fakeFindAll.mock.calls[0]).toEqual([{
      raw: true
    }])
    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
  })
})
