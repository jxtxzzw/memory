const Comment = require('../server/database/models/Comment')
const { getUserInfo } = require('./User')
const router = require('./router')

async function getNestedComments (itemId, replyid) {
  const comments = []
  const result = await Comment.findAll({
    where: {
      item: itemId,
      reply: replyid === 0 ? null : replyid
    }
  })
  for (const comment of result) {
    const user = await getUserInfo(comment.user)
    comments.push({
      id: comment.id,
      content: comment.content,
      reply: comment.reply == null ? 0 : comment.reply,
      date: comment.updatedAt,
      children: await getNestedComments(itemId, comment.id),
      updatedAt: comment.updatedAt,
      avatar: user.avatar,
      username: user.username
    })
  }
  comments.sort(function (a, b) {
    return b.updatedAt - a.updatedAt
  })
  return comments
}

router.post('/Comment/Get', async (req, res, next) => {
  const comment = await Comment.findOne({
    where: {
      id: req.body.id
    }
  })
  if (comment != null) {
    res.send(comment.content)
  } else {
    res.sendStatus(404)
  }
})

router.post('/Comment/Query', async (req, res, next) => {
  const data = req.body
  const itemId = data.itemId
  if (itemId == null) {
    res.sendStatus(406)
  } else {
    const comments = await getNestedComments(itemId, 0)
    res.json(comments)
  }
})

router.post('/Comment/Add', async (req, res, next) => {
  const data = req.body
  const userId = data.userId
  const itemId = data.itemId
  const content = data.content
  const reply = data.reply === 0 ? null : data.reply
  if (userId == null || itemId == null || content == null || content === '' || (reply != null && reply < 0)) {
    res.sendStatus(406)
  } else {
    await Comment.create({
      user: userId,
      item: itemId,
      content,
      reply
    })
    res.sendStatus(200)
  }
})

// module.exports = { getSingleComment }
