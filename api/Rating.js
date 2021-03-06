const Rating = require('../server/database/models/Item').Rating
const { getUserInfo } = require('./User')
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
      review: data.review,
      recursion: data.recursion
    }
  })
  if (!created) {
    instance.rating = data.rating
    instance.review = data.review
    instance.recursion = data.recursion
    await instance.save()
  }
}

async function getItemRating (id) {
  const result = await Rating.findAll({
    where: {
      item: id
    },
    attributes: ['user', 'rating', 'review', 'recursion', 'updatedAt']
  })
  const data = []
  for (const rating of result) {
    const user = await getUserInfo(rating.user)
    const singleRating = rating.toJSON()
    singleRating.username = user.username
    singleRating.avatar = user.avatar
    singleRating.user = user.id
    data.push(singleRating)
  }
  data.sort(function (a, b) {
    return b.updatedAt - a.updatedAt
  })
  return data
}

router.post('/Rating/rating', async (req, res, next) => {
  try {
    await addOrChangeRating(req.body, req.user)
    res.status(200).json('创建成功')
  } catch (e) {
    res.status(400).json(e.message)
  }
})

router.post('/Rating/item', async (req, res, next) => {
  try {
    const data = await getItemRating(req.body.id)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e.message)
  }
})
