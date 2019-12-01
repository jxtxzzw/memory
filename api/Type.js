const Type = require('../server/database/models/Type')
const { Item, Category } = require('../server/database/models/Item')

const router = require('./router')

async function getTypeList () {
  const result = await Type.findAll({
    attributes: ['id', 'name']
  })
  const typeList = []
  for (const type of result) {
    typeList.push({
      value: type.id,
      label: type.name
    })
  }
  return typeList
}

async function addType (data) {
  // eslint-disable-next-line eqeqeq
  if (data.id == 0) {
    await Type.create({
      name: data.name
    })
  } else {
    const result = await Type.findOne({
      where: {
        id: data.id
      },
      include: [Item, Category]
    })
    if (result) {
      if (data.name) {
        result.name = data.name
        await result.save()
      } else if (result.Items.length > 0) {
        throw new Error('该 type 无法删除')
      } else if (result.Categories.length > 0) {
        throw new Error('请先删除对应分类')
      } else {
        await Type.destroy({
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

router.post('/Type/getTypeList', async (req, res, next) => {
  const typeList = await getTypeList()
  res.json(typeList)
})

router.post('/addType', async (req, res, next) => {
  try {
    await addType(req.body)
    res.status(200).json('操作成功')
  } catch (e) {
    res.status(403).json(e)
  }
})
