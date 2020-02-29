const { Item, Category, Tag, Rating, Link } = require('../server/database/models/Item')
const uploadConfig = require('../assets/uploadConfig')
const router = require('./router')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getItemList (data) {
  const itemList = []
  if (!data.title) {
    data.title = ''
  }
  let result
  if (data.type) {
    result = await Item.findAll({
      where: {
        type: data.type,
        title: {
          [Op.like]: '%' + data.title + '%'
        }
      },
      limit: data.limit,
      offset: data.offset,
      attributes: ['id']
    })
  } else {
    result = await Item.findAll({
      where: {
        title: {
          [Op.like]: '%' + data.title + '%'
        }
      },
      limit: data.limit,
      offset: data.offset,
      attributes: ['id']
    })
  }
  for (const item of result) {
    itemList.push(await getItemInfo(item.id))
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
      }, {
        model: Link,
        attributes: ['description', 'link']
      }]
    })
    const data = result.toJSON()
    data.cover = data.cover ? uploadConfig.upload + data.cover : uploadConfig.defaultCover
    data.category = data.Categories.map(el => el.id)
    data.tag = data.Tags.map(el => el.name)
    data.link = data.Links.map((el) => {
      return {
        description: el.description,
        link: el.link
      }
    })
    data.Categories = undefined
    data.Tags = undefined
    data.Links = undefined
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
  const condition = {
    title: {
      [Op.like]: '%' + data.title + '%'
    },
    type: {
      [Op.or]: data.type
    },
    rating: {
      [Op.between]: data.ratingRange
    }
  }
  const include = [
    {
      model: Rating,
      where: {
        user: user.id
      },
      required: false
    }
  ]
  if (data.category.length > 0) {
    include.push({
      model: Category,
      where: {
        id: {
          [Op.or]: data.category
        }
      }
    })
  }
  if (data.updatetime) {
    condition.updatedAt = {
      [Op.between]: data.updatetime.map(el => new Date(el))
    }
  }
  let result = await Item.findAll({
    attributes: ['id', 'title', 'cover', 'rating'],
    where: condition,
    include
  })
  if (data.read === 'read') {
    result = result.filter((el) => {
      if (el.Ratings.length > 0) {
        return true
      }
      return false
    })
  } else if (data.read === 'unread') {
    result = result.filter((el) => {
      if (el.Ratings.length === 0) {
        return true
      }
      return false
    })
  }
  return result.map((el) => {
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
