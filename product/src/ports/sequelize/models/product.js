const create = (sequelize, { INTEGER, STRING }) =>
  sequelize.define('Product', {
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
  })

module.exports = {
  create,
}
