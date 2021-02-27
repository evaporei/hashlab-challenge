const tableName = 'users'

module.exports = {
  up: (queryInterface, { DataTypes: { DATE, DATEONLY, STRING } }) =>
    queryInterface.createTable(tableName, {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: STRING,
        allowNull: false,
        required: true,
      },
      last_name: {
        type: STRING,
        allowNull: false,
        required: true,
      },
      date_of_birth: {
        type: DATEONLY,
        allowNull: false,
        required: true,
      },
      created_at: {
        type: DATE,
        allowNull: false,
        required: true,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        required: true,
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      },
    }),
  down: queryInterface => queryInterface.dropTable(tableName),
}
