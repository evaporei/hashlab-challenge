const grpc = require('@grpc/grpc-js')
const { loadPackageDefinition, createCredentials } = require('js-commons/src/ports/grpc')

const { discount } = loadPackageDefinition('../../../../proto/discount.proto')

const client = new discount.DiscountService('discount-service:4000', createCredentials())

const getDiscount = (request) => new Promise((resolve, reject) =>
  client.getDiscount(request, (err, response) => {
    if (err) {
      return reject(err)
    }

    resolve(response.discount)
  }))

module.exports = {
  getDiscount
}
