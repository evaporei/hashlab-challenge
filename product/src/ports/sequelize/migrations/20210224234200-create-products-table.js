const tableName = 'products'

module.exports = {
  up: (queryInterface, { DataTypes: { DATE, INTEGER, STRING } }) =>
    queryInterface.createTable(tableName, {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
      },
      price: {
        type: INTEGER,
        allowNull: false,
        required: true,
      },
      title: {
        type: STRING,
        allowNull: false,
        required: true,
      },
      description: {
        type: STRING,
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
