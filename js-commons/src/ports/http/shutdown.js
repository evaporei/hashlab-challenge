const shutdownServer = (server, exitCode) =>
  server.close(() => process.exit(128 + exitCode))

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15
}

const setupGracefulShutdown = (server) => {
  for (const signalName in signals) {
    const signalValue = signals[signalName]

    process.on(signalName, (signal) =>
      shutdownServer(server, signalValue))
  }
}

module.exports = setupGracefulShutdown
