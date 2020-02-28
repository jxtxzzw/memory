// eslint-disable-next-line import/order
const dotenv = require('dotenv')
dotenv.config()

const passwordEncrypt = require('../../assets/passwordEncrypt')
const { User, Subscription } = require('./models/User')
const { Category } = require('./models/Item')
const Type = require('./models/Type')
const { defaultValues } = require('./defaultValues')
const sequelize = require('./index')

const MODELS = []
MODELS.push(User)
MODELS.push(Type)
MODELS.push(require('./models/Item').Tag)
MODELS.push(Category)
MODELS.push(require('./models/Item').Item)
MODELS.push(require('./models/ItemTag'))
MODELS.push(require('./models/ItemCategory'))
MODELS.push(require('./models/Comment'))
MODELS.push(require('./models/Item').Rating)
MODELS.push(Subscription)
MODELS.push(require('./models/User').Subscript)
MODELS.push(require('./models/Item').Link)
MODELS.push(require('./models/ItemLink'))

async function forceSyncModels (MODELS) {
  for (const model of MODELS) {
    await model.sync({ force: true })
  }
  console.log('Force Sync Done!')
}

async function generateDefaultValues () {
  let typeCount = 0
  let categoryCount = 0
  for (let i = 0; i < defaultValues.length; i++) {
    typeCount++
    await Type.create({
      id: typeCount,
      name: defaultValues[i].type
    })
    for (let j = 0; j < defaultValues[i].categories.length; j++) {
      categoryCount++
      await Category.create({
        id: categoryCount,
        name: defaultValues[i].categories[j],
        type: typeCount
      })
    }
  }

  await Subscription.create({ identifier: 'announcement' })
  await Subscription.create({ identifier: 'reply' })
  await Subscription.create({ identifier: 'share' })
  await Subscription.create({ identifier: 'password' })

  let password = process.env.MEMORY_ADMIN_PASSWORD
  // 如果没有定义 MEMORY_ADMIN_PASSWORD 环境变量，或者该字符串长度为 0，则随机生成一个初始密码
  if (!password || password.length === 0) {
    password = passwordEncrypt.randomPassword()
  }
  await User.create({
    username: process.env.MEMORY_ADMIN_USERNAME,
    realname: process.env.MEMORY_ADMIN_REALNAME,
    password: passwordEncrypt.serverEncrypt(passwordEncrypt.clientEncrypt(password)),
    email: process.env.MEMORY_ADMIN_EMAIL
  })
  console.log(`${process.env.MEMORY_ADMIN_USERNAME} 的密码是 ${password}。该密码仅会出现一次，请及时登录并修改。`)
}

sequelize
  .authenticate()
  .then(async () => {
    await forceSyncModels(MODELS)
    await generateDefaultValues()
  })
