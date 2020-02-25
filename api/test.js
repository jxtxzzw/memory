const { dispatch } = require('../assets/emailDispatcher')
const router = require('./router')

async function test (identifer, parameter) {
  await dispatch(identifer, parameter)
}

router.post('/mailtest', async (req, res, next) => {
  await test(req.identifier, req.paramater)
  res.sendStatus(200)
})
