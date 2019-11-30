const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

class ItemCategory extends Model {}
ItemCategory.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, { sequelize })

module.exports = ItemCategory
