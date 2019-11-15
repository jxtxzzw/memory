const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'dev_db.sqlite'
  }
)

const utils = {
  sequelize () {
    return sequelize
  }
}

module.exports = utils
