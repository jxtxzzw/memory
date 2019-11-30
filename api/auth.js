const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const uploadConfig = require('../assets/uploadConfig')
const User = require('../server/database/models/User')
const router = require('./router')

// Install middleware
router.use(cookieParser())

// JWT middleware
router.use(
  jwt({
    secret: process.env.MEMORY_JWT_SECERT || 'dummy'
  }).unless({
    path: '/api/auth/login'
  })
)

// -- Routes --

// [POST] /login
router.post('/auth/login', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: {
      username,
      password
    }
  })
  const valid = user != null

  if (!valid) {
    res.status(401).end('用户名或密码错误')
  }

  user.latest = new Date(Date.now())
  user.save()

  const accessToken = jsonwebtoken.sign(
    {
      id: user.id,
      username,
      avatar: user.avatar ? uploadConfig.upload + user.avatar : uploadConfig.defaultAvatar
    },
    process.env.MEMORY_JWT_SECERT || 'dummy'
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
