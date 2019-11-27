const Item = require('../server/database/models/Item')
const router = require('./router')

async function getItemList (data) {
  const itemList = []
  if (data.type) {
    const result = await Item.findAll({
      where: {
        type: data.type
      },
      limit: data.limit,
      offset: data.offset,
      attributes: ['id', 'title', 'cover', 'rating']
    })
    for (const item of result) {
      itemList.push({
        id: item.id,
        title: item.title,
        cover: item.cover,
        rating: item.rating
      })
    }
  } else {
    const result = await Item.findAll({
      limit: data.limit,
      offset: data.offset,
      attributes: ['id', 'title', 'cover', 'rating']
    })
    for (const item of result) {
      itemList.push({
        id: item.id,
        title: item.title,
        cover: item.cover,
        rating: item.rating
      })
    }
  }
  return itemList
}

async function getItemInfo (id) {
  const result = await Item.findOne({
    where: {
      id
    }
  })
  return result
}

async function itemIsExist (id) {
  const num = await Item.count({
    where: {
      id
    }
  })
  return num !== 0
}

router.post('/Item/itemList', async (req, res, next) => {
  const itemList = await getItemList(req.body)
  res.json(itemList)
})

router.post('/Item/itemInfo', async (req, res, next) => {
  const item = await getItemInfo(req.body.id)
  res.json(item)
})

router.post('/Item/exist', async (req, res, next) => {
  res.status(200).json({
    exist: await itemIsExist(req.body.id) })
})
