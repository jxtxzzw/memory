const Sequelize = require('sequelize')

let sequelize

if (process.env.MEMORY_DB_DIALECT === 'sqlite') {
  sequelize = new Sequelize(
    {
      dialect: process.env.MEMORY_DB_DIALECT,
      storage: process.env.MEMORY_DB
    }
  )
} else {
  sequelize = new Sequelize(
    process.env.MEMORY_DB,
    process.env.MEMORY_USERNAME,
    process.env.MEMORY_PASSWORD,
    {
      dialect: process.env.MEMORY_DB_DIALECT
    }
  )
}

module.exports = sequelize
