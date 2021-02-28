const { loadPackageDefinition, createCredentials } = require('js-commons/src/ports/grpc')
const circuitBreaker = require('js-commons/src/ports/circuit-breaker')
const { discount } = loadPackageDefinition('../../../../proto/discount.proto')

const client = new discount.DiscountService(process.env.DISCOUNT_SERVICE_HOST, createCredentials())

const getDiscount = (request) => new Promise((resolve, reject) =>
  client.getDiscount(request, (err, response) => {
    if (err) {
      return reject(err)
    }

    resolve(response.discount)
  }))

const getDiscountWithCircuitBreaker = circuitBreaker(getDiscount)

module.exports = {
  getDiscount: (request) => getDiscountWithCircuitBreaker.execute(request),
}
