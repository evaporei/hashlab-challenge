const { fromMessage, fromList } = require('../../src/presenters/error')

test('fromMessage', () => {
  expect(fromMessage('bad stuff')).toEqual({
    errors: [{ message: 'bad stuff' }]
  })
})

test('fromList', () => {
  const errorsList = [
    { message: 'field x is bad' },
    { message: 'field y is bad' },
    { message: 'you are not authorized' }
  ]
  expect(fromList(errorsList)).toEqual({
    errors: errorsList
  })
})
