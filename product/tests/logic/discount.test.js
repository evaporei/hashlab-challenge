const { isInt, calculateCentsValue, calculateDiscount } = require('../../src/logic/discount')

describe('isInt', () => {
  test('int', () => {
    expect(isInt(550)).toBe(true)
  })

  test('float', () => {
    expect(isInt(550.20)).toBe(false)
  })
})

describe('calculateCentsValue', () => {
  test('when dividing cents value gets an integer', () => {
    expect(calculateCentsValue(550, 10)).toBe(55)
  })

  test('when dividing cents value gets an float', () => {
    expect(calculateCentsValue(330, 7)).toBe(23)
  })
})

describe('calculateDiscount', () => {
  test('when discount client succeeds', async () => {
    const fakeDiscountClient = {
      getDiscount: jest.fn().mockReturnValueOnce(Promise.resolve({ percentage: 9.5 }))
    }
    const userId = 'usr_kjasdfiojaosidfjoaisjdfl'
    const product = {
      id: 'prd_cklk9ynb1000001rt6nzydsfv',
      price: 10000,
      title: 'Bike',
      description: 'cool bike',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }

    const productWithDiscount = await calculateDiscount(fakeDiscountClient, userId)(product)

    expect(fakeDiscountClient.getDiscount.mock.calls.length).toBe(1)
    expect(fakeDiscountClient.getDiscount.mock.calls[0]).toEqual([{
      product_id: product.id,
      user_id: userId,
    }])
    expect(productWithDiscount).toEqual({
      ...product,
      discount: {
        percentage: 9.5,
        value_in_cents: 950
      }
    })
  })

  test('when discount client fails', async () => {
    const fakeDiscountClient = {
      getDiscount: jest.fn().mockReturnValueOnce(Promise.reject(null))
    }
    const userId = 'usr_kjasdfiojaosidfjoaisjdfl'
    const product = {
      id: 'prd_cklk9ynb1000001rt6nzydsfv',
      price: 10000,
      title: 'Bike',
      description: 'cool bike',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }

    const productWithDiscount = await calculateDiscount(fakeDiscountClient, userId)(product)

    expect(fakeDiscountClient.getDiscount.mock.calls.length).toBe(1)
    expect(fakeDiscountClient.getDiscount.mock.calls[0]).toEqual([{
      product_id: product.id,
      user_id: userId,
    }])
    expect(productWithDiscount).toEqual({
      ...product,
      discount: {
        percentage: 0.0,
        value_in_cents: 0
      }
    })
  })
})
