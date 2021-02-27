const productPresenter = require('../../src/presenters/product')

describe('productPresenter', () => {
  test('with discount', () => {
    const inputProduct = {
      id: 'prd_aksjdflkjasdflk',
      price: 6454,
      title: 'Pajamas',
      description: 'it\'s for sleeping!',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      discount: {
        percentage: 7.8,
        value_in_cents: 1580,
      },
    }

    expect(productPresenter(inputProduct)).toEqual({
      id: inputProduct.id,
      price: inputProduct.price,
      title: inputProduct.title,
      description: inputProduct.description,
      discount: {
        percentage: inputProduct.discount.percentage,
        value_in_cents: inputProduct.discount.value_in_cents,
      },
    })
  })

  test('with NO discount', () => {
    const inputProduct = {
      id: 'prd_aksjdflkjasdflk',
      price: 6454,
      title: 'Pajamas',
      description: 'it\'s for sleeping!',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    expect(productPresenter(inputProduct)).toEqual({
      id: inputProduct.id,
      price: inputProduct.price,
      title: inputProduct.title,
      description: inputProduct.description,
    })
  })
})
