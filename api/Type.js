const Type = require('../server/database/models/Type')
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

router.post('/Type/getTypeList', async (req, res, next) => {
  const typeList = await getTypeList()
  res.json(typeList)
})
