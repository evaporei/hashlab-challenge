const { ServingStatus } = require('../ports/grpc/enums')

const check = (call, callback) =>
  callback(null, { status: ServingStatus.SERVING })

module.exports = {
  check,
}
