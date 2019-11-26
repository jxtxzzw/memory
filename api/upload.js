// eslint-disable-next-line no-unused-vars
const fs = require('fs')
const typeList = require('../assets/mimetype')
const Item = require('../server/database/models/Item')
const ItemCategory = require('../server/database/models/ItemCategory')
const Tag = require('../server/database/models/Tag')
const ItemTag = require('../server/database/models/ItemTag')
const router = require('./router')
// eslint-disable-next-line no-unused-vars

async function CreateItem (data) {
  try {
    let cover
    if (Object.prototype.hasOwnProperty.call(typeList, data.fileList[0].type)) {
      const imgData = data.fileList[0].thumbUrl
      const base64Data = imgData.replace(/(.*)?;base64,/, '')
      const dataBuffer = Buffer.from(base64Data, 'base64')
      cover = new Date().getTime() + '.' + typeList[data.fileList[0].type]
      fs.writeFile('./static/upload/' + cover, dataBuffer, () => {})
    } else {
      throw new Error('图片类型不符合')
    }
    const item = Item.build({})
    item.title = data.title
    item.type = data.type
    item.cover = cover
    await item.save()
    for (const category of data.checkedCategory) {
      await ItemCategory.create({ item: item.id, category: category.id })
    }
    for (const tag of data.tags) {
      const [tagInstance] = await Tag.findOrCreate({
        where: {
          name: tag
        },
        defaults: {
          name: tag
        }
      })
      ItemTag.create({ item: item.id, tag: tagInstance.id })
    }
  } catch (e) {
    throw new Error('创建失败:' + e)
  }
}

router.post('/upload', async (req, res, next) => {
  try {
    await CreateItem(req.body)
    res.status(200).json('创建成功')
  } catch (e) {
    res.status(400).json(e.message)
  }
})
