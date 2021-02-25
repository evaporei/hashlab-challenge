const fromMessage = message => ({
  errors: [{ message }]
})

const fromList = list => ({
  errors: list
})

module.exports = {
  fromMessage,
  fromList
}
