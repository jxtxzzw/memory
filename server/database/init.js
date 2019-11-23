require('./models/Category')
require('./models/Comment')
require('./models/Item')
require('./models/ItemCategory')
require('./models/Rating')
require('./models/Type')
require('./models/User')
require('./models/Tag')
require('./models/ItemTag')

const sequelize = require('./index')

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line standard/object-curly-even-spacing
    sequelize.sync()
  })
