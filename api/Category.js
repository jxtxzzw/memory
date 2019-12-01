const { Category, Item } = require('../server/database/models/Item')
const router = require('./router')

async function getCategoryList (type) {
  const result = await Category.findAll({
    where: {
      type
    },
    attributes: ['id', 'name']
  })
  const categoryList = []
  for (const type of result) {
    categoryList.push({ id: type.id, name: type.name })
  }
  return categoryList
}

async function addCategory (data) {
  // eslint-disable-next-line eqeqeq
  if (data.id == 0) {
    await Category.create({
      name: data.name,
      type: data.type
    })
  } else {
    const result = await Category.findOne({
      where: {
        id: data.id
      },
      include: [Item]
    })
    if (result) {
      if (data.name) {
        result.name = data.name
        await result.save()
      } else if (result.Items.length > 0) {
        throw new Error('该 type 无法删除')
      } else {
        await Category.destroy({
          where: {
            id: data.id
          }
        })
      }
    } else {
      throw new Error('id 非法')
    }
  }
}

router.post('/Category/categoryList', async (req, res, next) => {
  const categoryList = await getCategoryList(req.body.type)
  res.json(categoryList)
})

router.post('/addCategory', async (req, res, next) => {
  try {
    await addCategory(req.body)
    res.status(200).json('操作成功')
  } catch (e) {
    res.status(403).json(e)
  }
})
