const Sequelize = require('sequelize')
const Item = require('../server/database/models/Item')
const ItemCategory = require('../server/database/models/ItemCategory')
const ItemTag = require('../server/database/models/ItemTag')
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
      itemList.push(
        item.toJSON()
      )
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
      itemList.push(
        item.toJSON()
      )
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
  const categorys = await ItemCategory.findAll({
    where: {
      item: result.id
    }
  })
  const tags = await ItemTag.findAll({
    where: {
      item: result.id
    }
  })
  const data = result.toJSON()
  data.categor = []
  data.tag = []
  for (const category of categorys) {
    data.category.push(category.toJSON())
  }
  for (const tag of tags) {
    data.tag.push(tag.toJSON())
  }
  return data
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
