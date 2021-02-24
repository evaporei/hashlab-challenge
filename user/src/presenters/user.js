const userPresenter = inputUser => ({
  id: inputUser.id,
  first_name: inputUser.first_name,
  last_name: inputUser.last_name,
  date_of_birth: inputUser.date_of_birth,
})

module.exports = userPresenter
