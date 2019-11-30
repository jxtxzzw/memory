const Sequelize = require('sequelize')
const { Item, Category, Tag } = require('../server/database/models/Item')
const uploadConfig = require('../assets/uploadConfig')
const router = require('./router')
const Op = Sequelize.Op

async function getItemList (data) {
  const itemList = []
  if (!data.title) {
    data.title = ''
  }
  if (data.type) {
    const result = await Item.findAll({
      where: {
        type: data.type,
        title: {
          [Op.like]: '%' + data.title + '%'
        }
      },
      limit: data.limit,
      offset: data.offset,
      attributes: ['id', 'title', 'cover', 'rating']
    })
    for (const item of result) {
      const itemJSON = item.toJSON()
      itemJSON.cover = itemJSON.cover ? uploadConfig.upload + itemJSON.cover : uploadConfig.defaultCover
      itemList.push(itemJSON)
    }
  } else {
    const result = await Item.findAll({
      where: {
        title: {
          [Op.like]: '%' + data.title + '%'
        }
      },
      limit: data.limit,
      offset: data.offset,
      attributes: ['id', 'title', 'cover', 'rating']
    })
    for (const item of result) {
      const itemJSON = item.toJSON()
      itemJSON.cover = itemJSON.cover ? uploadConfig.upload + itemJSON.cover : uploadConfig.defaultCover
      itemList.push(itemJSON)
    }
  }
  return itemList
}

async function getItemInfo (id) {
  try {
    const result = await Item.findOne({
      where: {
        id
      },
      include: [{
        model: Category,
        attributes: ['id']
      }, {
        model: Tag,
        attributes: ['name']
      }]
    })
    const data = result.toJSON()
    data.cover = data.cover ? uploadConfig.upload + data.cover : uploadConfig.defaultCover
    data.category = data.Categories.map(el => el.id)
    data.tag = data.Tags.map(el => el.name)
    data.Categories = undefined
    data.Tags = undefined
    return data
  } catch (e) {
    return null
  }
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
  if (item) {
    res.json(item)
  } else {
    res.sendStatus(404)
  }
})

router.post('/Item/exist', async (req, res, next) => {
  res.status(200).json({
    exist: await itemIsExist(req.body.id) })
})
