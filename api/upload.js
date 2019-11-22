const fs = require('fs')
const router = require('./router')
router.post('/upload', (req, res, next) => {
  const imgData = req.body.file.thumbUrl
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')
  fs.writeFile('image.png', dataBuffer, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send('保存成功！')
    }
  })
})
