const Sequelize = require('sequelize')

let sequelize

if (process.env.MEMORY_PROD === 'true') {
  sequelize = new Sequelize(
    process.env.MEMORY_DB,
    process.env.MEMORY_USERNAME,
    process.env.MEMORY_PASSWORD,
    {
      dialect: 'mariadb'
    }
  )
} else {
  sequelize = new Sequelize(
    {
      dialect: 'sqlite',
      storage: 'dev_db.sqlite'
    }
  )
}

module.exports = sequelize
