const Rating = require('../server/database/models/Rating')
const router = require('./router')

async function addOrChangeRating (data, user) {
  const [instance, created] = await Rating.findOrCreate({
    where: {
      user: user.id,
      item: data.item
    },
    defaults: {
      user: user.id,
      item: data.item,
      rating: data.rating,
      review: data.review
    }
  })
  if (!created) {
    instance.rating = data.rating
    instance.review = data.review
    await instance.save()
  }
}

router.post('/Rating/rating', async (req, res, next) => {
  try {
    await addOrChangeRating(req.body, req.user)
    res.status(200).json('创建成功')
  } catch (e) {
    res.status(400).json(e.message)
  }
})
