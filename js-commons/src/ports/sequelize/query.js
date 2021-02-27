const { Op } = require('sequelize')

const isEmpty = obj =>
  Object.keys(obj).length === 0

const filterQueriableFields = (reqQuery, queryableFields) => {
  const filteredList = Object.entries(reqQuery)
    .filter(([key]) => queryableFields.includes(key))

  return Object.fromEntries(filteredList)
}

const buildWhere = (query, queryableFields) => {
  const filteredQuery = filterQueriableFields(query, queryableFields)

  if (isEmpty(filteredQuery)) {
    return { where: {} }
  }

  const queriedFields = Object.entries(filteredQuery)
    .reduce((where, [key, value]) => {
      const isString = typeof value === 'string'
      const operator = isString
        ? Op.like
        : Op.eq
      const includedValue = isString
        ? `%${value}%`
        : value

      return {
        ...where,
        [key]: {
          [operator]: includedValue,
        },
      }
    }, {})

  return { where: queriedFields }
}

const clamp = (min, max, value) =>
  Math.min(Math.max(value, min), max)

const buildPagination = options => {
  const { page = 1, count = 10 } = options

  const limit = clamp(1, 50, count)
  const offset = (Math.max(1, page) - 1) * limit

  return {
    limit,
    offset,
  }
}

const defaultOrdering = {
  order: [['id', 'DESC']],
}

module.exports = {
  buildPagination,
  buildWhere,
  defaultOrdering,
}
