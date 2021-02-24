const create = (sequelize, { DATEONLY, STRING }) =>
  sequelize.define('User', {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
      required: true
    },
    first_name: {
      type: STRING,
      allowNull: false,
      required: true
    },
    last_name: {
      type: STRING,
      allowNull: false,
      required: true
    },
    date_of_birth: {
      type: DATEONLY,
      allowNull: false,
      required: true
    }
  })

module.exports = {
  create
}
