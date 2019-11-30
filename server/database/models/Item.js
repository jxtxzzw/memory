const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const Type = require('./Type')

class Item extends Model {}
Item.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER,
    references: {
      model: Type,
      key: 'id'
    }
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize
})

module.exports = Item
