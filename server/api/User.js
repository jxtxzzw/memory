const User = require('../database/models/User')

export default async function (req, res, next) {
  // req 是 Node.js http request 对象
  console.log(req.method)
  console.log(req.body)

  if (req.method === 'POST') {
    const result = await User.findOne({
      where: {
        id: req.body.id
      }
    })
    console.log(result)
    res.json(result)
  } else {
    // res 是 Node.js http response 对象
    res.sendStatus(406)
  }

  // next是一个调用下一个中间件的函数
  // 如果您的中间件不是最终执行，请不要忘记在最后调用next！
  next()
}
