const { loadPackageDefinition, createCredentials } = require('js-commons/src/ports/grpc')

const { discount } = loadPackageDefinition('../../../../proto/discount.proto')

const client = new discount.DiscountService(process.env.DISCOUNT_SERVICE_HOST, createCredentials())

const getDiscount = (request) => new Promise((resolve, reject) =>
  client.getDiscount(request, (err, response) => {
    if (err) {
      return reject(err)
    }

    resolve(response.discount)
  }))

module.exports = {
  getDiscount,
}
