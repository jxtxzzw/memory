const User = require('../server/database/models/User')
const router = require('./router')

router.post('/User', async (req, res, next) => {
  // 只有超级管理员可以管理员工信息
  if (req.user.id !== 1) {
    res.sendStatus(403)
  }
  const users = await User.findAll({
    attributes: [
      'id',
      'username',
      'realname',
      'latest',
      'avatar'
    ]
  })
  res.json(users)
})
