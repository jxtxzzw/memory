require('./models/Category')
require('./models/Comment')
require('./models/Item')
require('./models/ItemCategory')
require('./models/Rating')
require('./models/Type')
require('./models/User')

const sequelize = require('./index')

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ force: true })
  })
