const Type = require('../server/database/models/Type')
const router = require('./router')

async function getTypeList (type) {
  const result = await Type.findAll({
    where: {
      type
    },
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
  const typeList = await getTypeList(req.body.type)
  res.json(typeList)
})
