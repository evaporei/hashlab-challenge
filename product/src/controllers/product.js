const { buildWhere, buildPagination, defaultOrdering } = require('js-commons/src/ports/sequelize/query')
const { calculateDiscount } = require('../logic/discount')
const productPresenter = require('../presenters/product')

const queryableFields = ['price', 'title', 'description']

const list = (repository, discountClient) => async (req, res) => {
  const products = await repository.Product.findAll({
    ...buildWhere(req.query, queryableFields),
    ...defaultOrdering,
    ...buildPagination({ page: req.query.page, count: req.query.count }),
    raw: true,
  })

  const userId = req.get('X-USER-ID')

  const productsWithDiscount =
    await Promise.all(products.map(calculateDiscount(discountClient, userId)))

  res.status(200).send(productsWithDiscount.map(productPresenter))
}

module.exports = {
  list,
}
