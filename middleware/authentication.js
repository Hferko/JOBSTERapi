const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('A hitelesítés érvénytelen')
  }
  const token = authHeader.split(' ')[1]  
 
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const testUser = payload.userID === '679a98f9dfe2b830dc0df04b';
    // Ha megfelelő a belépés a usert hozzáadjuk a 'JOB' routerhez is:
    req.user = { userID: payload.userID, testUser }
    console.log(req.user);
    next()
  } 
  catch (error) {
    throw new UnauthenticatedError('A hitelesítés érvénytelen')
  }
}

module.exports = auth;