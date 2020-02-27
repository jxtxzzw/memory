const sequelize = require('../index')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class ItemLink extends Model {}
ItemLink.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: Sequelize.INTEGER
  },
  link: {
    type: Sequelize.INTEGER
  }
}, { sequelize })

module.exports = ItemLink
