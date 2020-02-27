// eslint-disable-next-line import/order
const dotenv = require('dotenv')
dotenv.config()

const passwordEncrypt = require('../../assets/passwordEncrypt')
const { User, Subscription } = require('./models/User')
const { Category } = require('./models/Item')
const Type = require('./models/Type')
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
  const organize = [
    {
      type: '小说',
      categories: [
        '言情',
        '推理',
        '军事',
        '历史',
        '科幻'
      ]
    },
    {
      type: '电影',
      categories: [
        '科幻'
      ]
    },
    {
      type: '音乐',
      categories: []
    },
    {
      type: '动漫',
      categories: [
        '战斗',
        '校园',
        '美食',
        '恋爱'
      ]
    },
    {
      type: '电视',
      categories: [
        '科幻',
        '高效',
        '纪实',
        '动作'
      ]
    },
    {
      type: '课程',
      categories: [
        '人工智能',
        '编程语言',
        '前后端开发',
        '计算机基础'
      ]
    },
    {
      type: '软件',
      categories: [
        '优化软件',
        '办公软件',
        '加密分区',
        '图形图像',
        '备份还原',
        '建站运维',
        '截屏录制',
        '手机刷机',
        '报刊书籍',
        '操作系统',
        '效率辅助',
        '数学统计',
        '文字语音',
        '杀毒软件'
      ]
    }
  ]

  let typeCount = 0
  let categoryCount = 0
  for (let i = 0; i < organize.length; i++) {
    typeCount++
    await Type.create({
      id: typeCount,
      name: organize[i].type
    })
    for (let j = 0; j < organize[i].categories.length; j++) {
      categoryCount++
      await Category.create({
        id: categoryCount,
        name: organize[i].categories[j],
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
