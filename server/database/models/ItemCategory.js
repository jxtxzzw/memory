const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index').sequelize()

const Item = require('./Item')
const Category = require('./Category')

class ItemCategory extends Model {}
ItemCategory.init({
  item: {
    type: Sequelize.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  category: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  sequelize
})
