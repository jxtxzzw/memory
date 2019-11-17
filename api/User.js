const User = require('../server/database/models/User')
const router = require('./router')

router.post('/User', async (req, res, next) => {
  // req 是 Node.js http request 对象
  const result = await User.findOne({
    where: {
      id: req.body.id
    }
  })
  res.json(result)

  // next 是一个调用下一个中间件的函数
  // 如果您的中间件不是最终执行，请不要忘记在最后调用 next！
  // next()
})
