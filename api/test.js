const { dispatch } = require('../assets/emailDispatcher')
const router = require('./router')

async function test (identifier, parameter) {
  await dispatch(identifier, parameter)
}

router.post('/mailtest', async (req, res, next) => {
  await test(req.body.identifier, req.body.parameter)
  res.sendStatus(200)
})
