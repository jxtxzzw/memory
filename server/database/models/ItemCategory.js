const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

class ItemCategory extends Model {}
ItemCategory.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.INTEGER
  }
}, { sequelize })

module.exports = ItemCategory
