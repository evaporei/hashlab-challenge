const userPresenter = require('../../src/presenters/user')

test('userPresenter', () => {
  const inputUser = {
    id: 'usr_ckljj7jy900001iofhtrehz8u',
    first_name: 'Jose',
    last_name: 'Maria',
    date_of_birth: '2021-02-24',
    created_at: '2021-02-24T18:22:05.175Z',
    updated_at: '2021-02-24T18:22:05.175Z',
    deleted_at: null,
  }

  expect(userPresenter(inputUser)).toEqual({
    id: inputUser.id,
    first_name: inputUser.first_name,
    last_name: inputUser.last_name,
    date_of_birth: inputUser.date_of_birth,
  })
})
