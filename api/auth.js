const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const router = require('./router')

// Install middleware
router.use(cookieParser())
router.use(bodyParser.json())

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
router.post('/auth/login', (req, res, next) => {
  console.log(req.body)
  const { username, password } = req.body
  const valid = username.length && password === '123'

  if (!valid) {
    throw new Error('Invalid username or password')
  }

  const accessToken = jsonwebtoken.sign(
    {
      username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username,
      scope: ['test', 'user']
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
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})
