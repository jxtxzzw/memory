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
    allowNull: false,
    unique: true
  },
  type: {
    type: Sequelize.INTEGER,
    references: {
      model: Type,
      key: 'id'
    }
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: true
  },
  attribute: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize
})
