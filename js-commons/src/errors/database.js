const CustomError = require('./')

class DatabaseError extends CustomError {
  constructor (sequelizeError) {
    super(sequelizeError.message)

    this.sequelizeError = sequelizeError
  }
}

module.exports = DatabaseError
