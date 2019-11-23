const Item = require('../server/database/models/Item')
const router = require('./router')

async function getItemList (type) {
  const itemList = []
  if (type === 'all') {
    const result = await Item.findAll({
      attributes: ['title', 'cover']
    })
    for (const item of result) {
      itemList.push({
        title: item.title,
        cover: item.cover
      })
    }
  } else {
    const result = await Item.findAll({
      where: {
        type
      },
      attributes: ['title', 'cover']
    })
    for (const item of result) {
      itemList.push({
        title: item.title,
        cover: item.cover
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

router.post('/Item/itemList', async (req, res, next) => {
  const itemList = await getItemList(req.body.type)
  res.json(itemList)
})

router.post('/Item/itemInfo', async (req, res, next) => {
  const item = await getItemInfo(req.body.id)
  res.json(item)
})
