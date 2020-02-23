const sequelize = require('../index')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class ItemTag extends Model {}
ItemTag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: Sequelize.INTEGER
  },
  tag: {
    type: Sequelize.INTEGER
  }
}, { sequelize })

module.exports = ItemTag
