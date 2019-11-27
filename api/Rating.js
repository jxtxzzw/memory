const Rating = require('../server/database/models/Rating')
const User = require('../server/database/models/User')
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

async function getItemRating (id) {
  const result = await Rating.findAll({
    where: {
      item: id
    },
    attributes: ['user', 'rating', 'review']
  })
  const data = []
  for (const rating of result) {
    const user = await User.findOne({
      where: {
        id: rating.user
      }
    })
    const singleRating = rating.toJSON()
    singleRating.user = user.username
    singleRating.avater = user.avater
    data.push(singleRating)
  }
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
