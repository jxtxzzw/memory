const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const Comment = require('./Comment')

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

Item.hasMany(Comment, { foreignKey: 'item' })

module.exports = Item
