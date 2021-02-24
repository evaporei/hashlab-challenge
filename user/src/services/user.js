const getUser = repository => async (call, callback) => {
  const user = await repository.User.findOne({
    where: { id: call.request.user_id },
    raw: true,
  })

  callback(null, { user })
}

module.exports = (repository) => ({
  getUser: getUser(repository),
})
