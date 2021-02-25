const productPresenter = inputProduct => ({
  id: inputProduct.id,
  price: inputProduct.price,
  title: inputProduct.title,
  description: inputProduct.description
})

module.exports = productPresenter
