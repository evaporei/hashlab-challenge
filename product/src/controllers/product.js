const { buildWhere, buildPagination, defaultOrdering } = require('js-commons/src/ports/sequelize/query')
const productPresenter = require('../presenters/product')

const queryableFields = ['price', 'title', 'description']

const list = repository => async (req, res) => {
  const products = await repository.Product.findAll({
    ...buildWhere(req.query, queryableFields),
    ...defaultOrdering,
    ...buildPagination({ page: req.query.page, count: req.query.count }),
    raw: true
  })

  res.status(200).send(products.map(productPresenter))
}

module.exports = {
  list
}
