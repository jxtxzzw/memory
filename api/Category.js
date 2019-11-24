const Category = require('../server/database/models/Category')
const router = require('./router')

async function getCategoryList () {
  const result = await Category.findAll({
    attributes: ['id', 'name']
  })
  const categoryList = []
  for (const type of result) {
    categoryList.push({ id: type.id, name: type.name })
  }
  return categoryList
}

router.post('/Category/categoryList', async (req, res, next) => {
  const categoryList = await getCategoryList()
  res.json(categoryList)
})
