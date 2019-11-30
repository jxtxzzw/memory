const Category = require('../server/database/models/Item').Category
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

router.post('/Category/categoryList', async (req, res, next) => {
  const categoryList = await getCategoryList(req.body.type)
  res.json(categoryList)
})
