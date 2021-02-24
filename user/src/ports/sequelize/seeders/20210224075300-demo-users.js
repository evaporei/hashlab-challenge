const tableName = 'users'

const today = new Date()
const twoDaysAgo = new Date()
twoDaysAgo.setDate(today.getDate() - 2)

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(tableName, [
      {
        id: 'a',
        first_name: 'Happy',
        last_name: 'Birthday',
        date_of_birth: today,
        created_at: today,
        updated_at: today,
      },
      {
        id: 'b',
        first_name: 'No',
        last_name: 'Birthday',
        date_of_birth: twoDaysAgo,
        created_at: today,
        updated_at: today,
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete(tableName, null, {})
}
