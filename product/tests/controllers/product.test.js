const productController = require('../../src/controllers/product')

describe('list', () => {
  describe('when discount is zero', () => {
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
          discount: {
            percentage: 0,
            value_in_cents: 0
          }
        },
        {
          id: 'prd_cklk9ynb2000101rt289h81ox',
          price: 5000,
          title: 'Video-game',
          description: 'bad video-game, it\'s broken',
          discount: {
            percentage: 0,
            value_in_cents: 0
          }
        },
      ]

      const fakeFindAll = jest.fn().mockReturnValueOnce(Promise.resolve(existingProducts))
      const fakeRepository = {
        Product: {
          findAll: fakeFindAll,
        }
      }
      const fakeDiscountClient = {
        getDiscount: jest.fn().mockReturnValue(Promise.resolve({ percentage: 0.0 }))
      }

      const fakeReq = { get: jest.fn().mockReturnValueOnce(undefined), query: {} }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(200)
          return {
            send: fakeSend
          }
        }
      }

      await productController.list(fakeRepository, fakeDiscountClient)(fakeReq, fakeRes)

      expect(fakeFindAll.mock.calls.length).toBe(1)
      expect(fakeFindAll.mock.calls[0]).toEqual([{
        where: {},
        limit: 10,
        offset: 0,
        order: [['id', 'DESC']],
        raw: true
      }])
      expect(fakeReq.get.mock.calls.length).toEqual(1)
      expect(fakeReq.get.mock.calls[0]).toEqual(['X-USER-ID'])
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
      const fakeDiscountClient = {
        getDiscount: jest.fn().mockReturnValue(Promise.resolve({ percentage: 0.0 }))
      }

      const fakeReq = { get: jest.fn().mockReturnValueOnce(undefined), query: {} }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(200)
          return {
            send: fakeSend
          }
        }
      }

      await productController.list(fakeRepository, fakeDiscountClient)(fakeReq, fakeRes)

      expect(fakeFindAll.mock.calls.length).toBe(1)
      expect(fakeFindAll.mock.calls[0]).toEqual([{
        where: {},
        limit: 10,
        offset: 0,
        order: [['id', 'DESC']],
        raw: true
      }])
      expect(fakeReq.get.mock.calls.length).toEqual(1)
      expect(fakeReq.get.mock.calls[0]).toEqual(['X-USER-ID'])
      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
    })
  })

  describe('when discount is NOT zero', () => {
    describe('when there are products', () => {
      test('when the discounts are the same', async () => {
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
            discount: {
              percentage: 10,
              value_in_cents: 1000
            }
          },
          {
            id: 'prd_cklk9ynb2000101rt289h81ox',
            price: 5000,
            title: 'Video-game',
            description: 'bad video-game, it\'s broken',
            discount: {
              percentage: 10,
              value_in_cents: 500
            }
          },
        ]

        const fakeFindAll = jest.fn().mockReturnValueOnce(Promise.resolve(existingProducts))
        const fakeRepository = {
          Product: {
            findAll: fakeFindAll,
          }
        }
        const fakeDiscountClient = {
          getDiscount: jest.fn().mockReturnValue(Promise.resolve({ percentage: 10.0 }))
        }

        const fakeReq = { get: jest.fn().mockReturnValueOnce(undefined), query: {} }
        const fakeSend = jest.fn()
        const fakeRes = {
          status: statusCode => {
            expect(statusCode).toBe(200)
            return {
              send: fakeSend
            }
          }
        }

        await productController.list(fakeRepository, fakeDiscountClient)(fakeReq, fakeRes)

        expect(fakeFindAll.mock.calls.length).toBe(1)
        expect(fakeFindAll.mock.calls[0]).toEqual([{
          where: {},
          limit: 10,
          offset: 0,
          order: [['id', 'DESC']],
          raw: true
        }])
        expect(fakeReq.get.mock.calls.length).toEqual(1)
        expect(fakeReq.get.mock.calls[0]).toEqual(['X-USER-ID'])
        expect(fakeSend.mock.calls.length).toBe(1)
        expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
      })

      test('when the discounts are different', async () => {
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
            discount: {
              percentage: 10,
              value_in_cents: 1000
            }
          },
          {
            id: 'prd_cklk9ynb2000101rt289h81ox',
            price: 5000,
            title: 'Video-game',
            description: 'bad video-game, it\'s broken',
            discount: {
              percentage: 8,
              value_in_cents: 400
            }
          },
        ]

        const fakeFindAll = jest.fn().mockReturnValueOnce(Promise.resolve(existingProducts))
        const fakeRepository = {
          Product: {
            findAll: fakeFindAll,
          }
        }
        const fakeDiscountClient = {
          getDiscount: jest.fn()
            .mockReturnValueOnce(Promise.resolve({ percentage: 10.0 }))
            .mockReturnValueOnce(Promise.resolve({ percentage: 8.0 }))
        }

        const fakeReq = { get: jest.fn().mockReturnValueOnce(undefined), query: {} }
        const fakeSend = jest.fn()
        const fakeRes = {
          status: statusCode => {
            expect(statusCode).toBe(200)
            return {
              send: fakeSend
            }
          }
        }

        await productController.list(fakeRepository, fakeDiscountClient)(fakeReq, fakeRes)

        expect(fakeFindAll.mock.calls.length).toBe(1)
        expect(fakeFindAll.mock.calls[0]).toEqual([{
          where: {},
          limit: 10,
          offset: 0,
          order: [['id', 'DESC']],
          raw: true
        }])
        expect(fakeReq.get.mock.calls.length).toEqual(1)
        expect(fakeReq.get.mock.calls[0]).toEqual(['X-USER-ID'])
        expect(fakeSend.mock.calls.length).toBe(1)
        expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
      })
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
      const fakeDiscountClient = {
        getDiscount: jest.fn().mockReturnValue(Promise.resolve({ percentage: 10.0 }))
      }

      const fakeReq = { get: jest.fn().mockReturnValueOnce(undefined), query: {} }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(200)
          return {
            send: fakeSend
          }
        }
      }

      await productController.list(fakeRepository, fakeDiscountClient)(fakeReq, fakeRes)

      expect(fakeFindAll.mock.calls.length).toBe(1)
      expect(fakeFindAll.mock.calls[0]).toEqual([{
        where: {},
        limit: 10,
        offset: 0,
        order: [['id', 'DESC']],
        raw: true
      }])
      expect(fakeReq.get.mock.calls.length).toEqual(1)
      expect(fakeReq.get.mock.calls[0]).toEqual(['X-USER-ID'])
      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0]).toEqual([expectedProducts])
    })
  })
})
