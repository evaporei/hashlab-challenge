const getUser = (call, callback) => {
  console.log('req', call.request)

  callback(null, {
    user: {
      id: call.request.user_id,
      first_name: 'john',
      last_name: 'doe',
      date_of_birth: '1997-10-09',
    },
  })
}

module.exports = { getUser }
