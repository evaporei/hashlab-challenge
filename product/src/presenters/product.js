const productPresenter = inputProduct => ({
  id: inputProduct.id,
  price: inputProduct.price,
  title: inputProduct.title,
  description: inputProduct.description,
  discount: inputProduct.discount
    ? {
      percentage: inputProduct.discount.percentage,
      value_in_cents: inputProduct.discount.value_in_cents
    }
    : undefined
})

module.exports = productPresenter
