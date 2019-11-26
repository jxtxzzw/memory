const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../server/database/models/User')
const router = require('./router')

// Install middleware
router.use(cookieParser())

// JWT middleware
router.use(
  jwt({
    secret: 'dummy'
  }).unless({
    path: '/api/auth/login'
  })
)

// -- Routes --

// [POST] /login
router.post('/auth/login', async (req, res, next) => {
  const { username, password } = req.body

  const result = await User.findOne({
    where: {
      username,
      password
    }
  })
  const valid = result != null

  if (!valid) {
    res.status(401).end('用户名或密码错误')
  }

  const accessToken = jsonwebtoken.sign(
    {
      id: result.id,
      username,
      picture: result.avatar
    },
    'dummy'
  )

  res.json({
    token: {
      accessToken
    }
  })
})

// [GET] /user
router.get('/auth/user', (req, res, next) => {
  res.json({ user: req.user })
})

// [POST] /logout
router.post('/auth/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

// Error handler
router.use((err, req, res, next) => {
  res.status(401).send(err + '')
})
