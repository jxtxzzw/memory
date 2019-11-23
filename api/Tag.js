const Tag = require('../server/database/models/Tag')
const router = require('./router')

async function getTagList () {
  const result = await Tag.findAll({
    attributes: ['id', 'name']
  })
  const tagList = []
  for (const type of result) {
    tagList.push(type.name)
  }
  return tagList
}

router.post('/Tag/tagList', async (req, res, next) => {
  const typeList = await getTagList()
  res.json(typeList)
})
