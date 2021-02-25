const productPresenter = require('../../src/presenters/product')

test('productPresenter', () => {
  const inputProduct = {
    id: 'prd_aksjdflkjasdflk',
    price: 6454,
    title: 'Pajamas',
    description: 'it\'s for sleeping!',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
  }

  expect(productPresenter(inputProduct)).toEqual({
    id: inputProduct.id,
    price: inputProduct.price,
    title: inputProduct.title,
    description: inputProduct.description
  })
})
