const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const passwordEncrypt = require('../assets/passwordEncrypt')
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
      avatar: user.avatar // TODO: avartar: '/upload/' + result.avartar
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

function changePassword (user, password, res) {
  try {
    user.password = password
    user.save()
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

router.post('/auth/change', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
        password: req.body.oldPassword
      }
    })
    if (user == null) {
      res.status(403).end('原密码错误')
    }
    await changePassword(user, req.body.newPassword, res)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

router.post('/auth/reset', async (req, res, next) => {
  // 只有超级管理员可以管理员工信息
  if (req.user.id !== 1) {
    res.sendStatus(403)
  }
  try {
    const user = await User.findOne({
      where: {
        id: req.body.userId
      }
    })
    const defaultPassword = passwordEncrypt.password(process.env.MEMORY_DEFAULT_PASSWORD || '123456')
    await changePassword(user, defaultPassword, res)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

// Error handler
router.use((err, req, res, next) => {
  res.status(401).send(err + '')
})
