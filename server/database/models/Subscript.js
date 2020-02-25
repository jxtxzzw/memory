const sequelize = require('../index')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Subscript extends Model {}
Subscript.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  identification: {
    type: Sequelize.INTEGER
  },
  user: {
    type: Sequelize.INTEGER
  }
}, { sequelize })

module.exports = Subscript
