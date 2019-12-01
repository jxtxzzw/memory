const Sequelize = require('sequelize')
const { Item, Category, Tag, Rating } = require('../server/database/models/Item')
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

async function advancedSearch (data, user) {
  let result = await Item.findAll({
    attributes: ['id', 'title', 'cover', 'rating'],
    where: {
      title: {
        [Op.like]: '%' + data.title + '%'
      },
      type: {
        [Op.or]: data.type
      },
      rating: {
        [Op.between]: data.ratingRange
      },
      updatedAt: {
        [Op.between]: data.updatetime.map(el => new Date(el))
      }
    },
    include: [{
      model: Category,
      where: {
        id: {
          [Op.or]: data.category
        }
      }
    },
    {
      model: Rating,
      where: {
        user: user.id
      },
      required: false
    }
    ]
  })
  if (data.read === 'read') {
    result = result.filter(el => {
      if (el.Ratings.length > 0) {
        return true
      }
      return false
    })
  } else if (data.read === 'unread') {
    result = result.filter(el => {
      if (el.Ratings.length === 0) {
        return true
      }
      return false
    })
  }
  return result.map(el => {
    el = el.toJSON()
    el.Ratings = undefined
    el.Categories = undefined
    el.cover = el.cover ? uploadConfig.upload + el.cover : uploadConfig.defaultCover
    return el
  })
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

router.post('/advancedSearch', async (req, res, next) => {
  try {
    const data = await advancedSearch(req.body, req.user)
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
})
