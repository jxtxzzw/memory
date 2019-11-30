const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

class ItemTag extends Model {}
ItemTag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, { sequelize })

module.exports = ItemTag
