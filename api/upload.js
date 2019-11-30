const fs = require('fs')
const typeList = require('../assets/mimetype')
const { Item } = require('../server/database/models/Item')
const ItemCategory = require('../server/database/models/ItemCategory')
const Tag = require('../server/database/models/Item').Tag
const ItemTag = require('../server/database/models/ItemTag')
const uploadConfig = require('../assets/uploadConfig')
const router = require('./router')

async function CreateItem (data) {
  try {
    let cover
    if (data.fileList[0] && data.fileList[0].thumbUrl) {
      if (Object.prototype.hasOwnProperty.call(typeList, data.fileList[0].type)) {
        const imgData = data.fileList[0].thumbUrl
        const base64Data = imgData.replace(/(.*)?;base64,/, '')
        const dataBuffer = Buffer.from(base64Data, 'base64')
        cover = new Date().getTime() + '.' + typeList[data.fileList[0].type]
        fs.writeFile(uploadConfig.uploadFS + cover, dataBuffer, () => {})
      } else {
        throw new Error('图片类型不符合')
      }
    }
    const [instance, created] = await Item.findOrCreate({
      where: {
        id: data.id || 0
      },
      defaults: {
        title: data.title,
        type: data.type,
        cover,
        note: data.note
      }
    })
    if (!created) {
      instance.title = data.title
      instance.type = data.type
      instance.note = data.note
      if (cover) {
        instance.cover = cover
      }
      instance.save()
    }
    ItemCategory.destroy({
      where: {
        item: instance.id
      }
    })
    ItemTag.destroy({
      where: {
        item: instance.id
      }
    })
    for (const category of data.checkedCategory) {
      await ItemCategory.create({ item: instance.id, category })
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
      ItemTag.create({ item: instance.id, tag: tagInstance.id })
    }
    return instance
  } catch (e) {
    throw new Error('失败:' + e)
  }
}

router.post('/upload', async (req, res, next) => {
  try {
    const item = await CreateItem(req.body)
    if (!item.creator) {
      item.creator = req.user.id
    }
    item.updater = req.user.id
    item.save()
    res.status(200).json({
      id: item.id
    })
  } catch (e) {
    res.status(400).json(e.message)
  }
})
