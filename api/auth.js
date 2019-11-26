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
    secret: process.env.MEMORY_JWT_SECERT || 'dummy'
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
      avatar: result.avatar
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

router.post('/auth/change', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
        password: req.body.oldPassword
      }
    })
    user.password = req.body.newPassword
    user.save()
    res.sendStatus(200)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

// Error handler
router.use((err, req, res, next) => {
  res.status(401).send(err + '')
})
