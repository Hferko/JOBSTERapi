const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser');

// LIMITER
const rateLimiter = require('express-rate-limit');
const appLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Túl sok kérés erről az IP címről. Kérjük próbálja újra 15 perc múlva'
  }
})

const {login, register, updateUser} = require('../controllers/authController')

router.post('/register',appLimiter, register)
router.post('/login',appLimiter, login)
router.patch('/updateUser',authenticateUser, testUser, updateUser)

module.exports = router