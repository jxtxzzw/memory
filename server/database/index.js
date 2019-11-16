const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'dev_db.sqlite'
  }
)

module.exports = sequelize
