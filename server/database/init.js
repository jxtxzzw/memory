const passwordEncrypt = require('../../assets/passwordEncrypt')
const { User, Subscription } = require('./models/User')
const Type = require('./models/Type')
const sequelize = require('./index')

const MODELS = []
MODELS.push(User)
MODELS.push(Type)
MODELS.push(require('./models/Item').Tag)
MODELS.push(require('./models/Item').Category)
MODELS.push(require('./models/Item').Item)
MODELS.push(require('./models/ItemTag'))
MODELS.push(require('./models/ItemCategory'))
MODELS.push(require('./models/Comment'))
MODELS.push(require('./models/Item').Rating)
MODELS.push(Subscription)
MODELS.push(require('./models/User').Subscript)

async function forceSyncModels (MODELS) {
  for (const model of MODELS) {
    await model.sync({ force: true })
  }
  console.log('Force Sync Done!')
}

async function generateDefaultValues () {
  await Type.create({ name: '小说' })
  await Type.create({ name: '电影' })
  await Type.create({ name: '音乐' })
  await Type.create({ name: '番剧' })
  await Type.create({ name: '软件' })
  await Type.create({ name: '课程' })

  await Subscription.create({ identifier: 'announcement' })
  await Subscription.create({ identifier: 'reply' })
  await Subscription.create({ identifier: 'share' })
  await Subscription.create({ identifier: 'password' })

  const password = passwordEncrypt.randomPassword()
  await User.create({
    username: 'admin',
    password: passwordEncrypt.serverEncrypt(passwordEncrypt.clientEncrypt(password)),
    email: 'admin@example.com'
  })
  console.log(`admin (admin@example.com) 的密码是 ${password}。该密码仅会出现一次，请及时登录并修改。`)
}

sequelize
  .authenticate()
  .then(async () => {
    await forceSyncModels(MODELS)
    await generateDefaultValues()
  })
