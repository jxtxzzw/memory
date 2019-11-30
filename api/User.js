const fs = require('fs')
const User = require('../server/database/models/User')
const { Item, Rating } = require('../server/database/models/Item')
const Comment = require('../server/database/models/Comment')
const passwordEncrypt = require('../assets/passwordEncrypt')
const typeList = require('../assets/mimetype')
const uploadConfig = require('../assets/uploadConfig')
const router = require('./router')

router.post('/User/users', async (req, res, next) => {
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

async function getUserInfo (id) {
  const ratings = await Rating.findAll({
    where: {
      user: id
    }
  })
  const data = []
  for (const rating of ratings) {
    const ratingNum = await Rating.count({
      where: {
        item: rating.item
      }
    })
    const item = await Item.findOne({
      where: {
        id: rating.item
      }
    })
    const commentNum = await Comment.count({
      where: {
        item: rating.item
      }
    })
    data.push({
      id: item.id,
      title: item.title,
      description: rating.rating,
      content: rating.review,
      rating: item.rating,
      ratingCount: ratingNum,
      replyCount: commentNum,
      itemCover: item.cover
    })
  }
  return data
}

router.post('/User/userinfo', async (req, res, next) => {
  try {
    const result = await getUserInfo(req.user.id)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e)
  }
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

function resetPassword (user, res) {
  const defaultPassword = passwordEncrypt.password(process.env.MEMORY_DEFAULT_PASSWORD || '123456')
  changePassword(user, defaultPassword, res)
}

router.post('/User/change', async (req, res, next) => {
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
    changePassword(user, req.body.newPassword, res)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

router.post('/User/reset', async (req, res, next) => {
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
    resetPassword(user, res)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

router.post('/User/add', async (req, res, next) => {
  // 只有超级管理员可以管理员工信息
  if (req.user.id !== 1) {
    res.sendStatus(403)
  }
  try {
    // 需要是一个不持久化的 instance，之后通过修改密码处的 save() 来持久化
    // 如果直接用 .create() 就会因为密码 not null 而错误
    const user = await User.build({
      username: req.body.username,
      realname: req.body.realname
    })
    resetPassword(user, res)
  } catch (e) {
    res.status(500).end('' + e)
  }
})

router.post('/User/avatar', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    })
    const data = req.body
    let avatar
    if (data.fileList[0] && data.fileList[0].thumbUrl) {
      if (Object.prototype.hasOwnProperty.call(typeList, data.fileList[0].type)) {
        const imgData = data.fileList[0].thumbUrl
        const base64Data = imgData.replace(/(.*)?;base64,/, '')
        const dataBuffer = Buffer.from(base64Data, 'base64')
        avatar = new Date().getTime() + '.' + typeList[data.fileList[0].type]
        fs.writeFile(uploadConfig.uploadFS + avatar, dataBuffer, () => {
        })
      } else {
        throw new Error('图片类型不符合')
      }
      user.avatar = avatar
    } else {
      user.avatar = null
    }
    user.save()
    res.sendStatus(200)
  } catch (e) {
    res.status(500).end('' + e)
  }
})
