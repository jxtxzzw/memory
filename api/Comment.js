const Comment = require('../server/database/models/Comment')
const router = require('./router')

async function getNestedComment (itemId, replyid) {
  const result = await Comment.findAll({
    where: {
      item: itemId,
      reply: replyid === 0 ? null : replyid
    }
  })
  for (const comment of result) {
    comment.reply = comment.reply == null ? 0 : comment.reply
    comment.children = await getNestedComment(itemId, comment.id)
  }
}

router.get('/Comment/Query', async (req, res, next) => {
  const data = req.body
  const itemId = data.itemId
  if (itemId == null) {
    res.sendStatus(406)
  } else {
    const result = await getNestedComment(itemId, 0)
    res.json(result)
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
