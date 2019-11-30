const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

class ItemCategory extends Model {}
ItemCategory.init({}, { sequelize })

module.exports = ItemCategory
