const isInt = n => n % 1 === 0

const calculateCentsValue = (priceInCents, percentage) => {
  const centsValue = (percentage / 100) * priceInCents

  return isInt(centsValue)
    ? centsValue
    : Math.floor(centsValue)
}

const calculateDiscount = (discountClient, userId = '') => async product => {
  const { percentage } = await discountClient.getDiscount({ product_id: product.id, user_id: userId })
    .catch(() => ({ percentage: 0.0 }))

  return {
    ...product,
    discount: {
      percentage,
      value_in_cents: calculateCentsValue(product.price, percentage)
    }
  }
}

module.exports = { isInt, calculateCentsValue, calculateDiscount }
