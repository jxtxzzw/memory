require('./models/Category')
require('./models/Comment')
require('./models/Item')
require('./models/ItemCategory')
require('./models/Rating')
require('./models/Type')
require('./models/User')

const sequelize = require('./index').sequelize()

sequelize
  .authenticate()
  .then(() => {
    // console.log('Connection has been established successfully.')
    sequelize.sync({ force: true })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })
