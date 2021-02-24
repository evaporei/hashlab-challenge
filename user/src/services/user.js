const userPresenter = require('../presenters/user')

const getUser = repository => async (call, callback) => {
  const user = await repository.User.findOne({
    where: { id: call.request.user_id },
    raw: true,
  })

  callback(null, { user: user ? userPresenter(user) : null })
}

module.exports = (repository) => ({
  getUser: getUser(repository),
})
