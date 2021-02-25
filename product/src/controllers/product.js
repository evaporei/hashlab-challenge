const productPresenter = require('../presenters/product')

const list = repository => async (req, res) => {
  const products = await repository.Product.findAll({
    raw: true,
  })

  res.status(200).send(products.map(productPresenter))
}

module.exports = {
  list
}
