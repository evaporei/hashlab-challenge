const { commandFactory } = require("hystrixjs")
const circuitBreaker = (
  runFn,
  opts = {
    name: Symbol(runFn),
    errorThreshold: 1,
    timeout: 3000,
    concurrency: 0,
  }
) =>
  commandFactory.getOrCreate(opts.name)
    .circuitBreakerErrorThresholdPercentage(opts.errorThreshold)
    .timeout(opts.timeout)
    .run(runFn)
    .circuitBreakerSleepWindowInMilliseconds(opts.timeout)
    .statisticalWindowLength(10000)
    .statisticalWindowNumberOfBuckets(10)
    .requestVolumeRejectionThreshold(opts.concurrency)
    .build()

module.exports = circuitBreaker
