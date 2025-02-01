const {BadRequestError} = require('../errors');

const testUser = (req,res,next) => {
  if (req.user.testUser) {
    throw new BadRequestError('"teszt User". Az adatok csak olvashatóak.')
  }
  next()
}
module.exports = testUser;