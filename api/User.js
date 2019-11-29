const User = require('../server/database/models/User')
const Item = require('../server/database/models/Item')
const Rating = require('../server/database/models/Rating')
const Comment = require('../server/database/models/Comment')
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

router.post('/userinfo', async (req, res, next) => {
  try {
    const result = await getUserInfo(req.user.id)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e)
  }
})
