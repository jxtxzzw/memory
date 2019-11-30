const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const Item = require('./Item')
const ItemCategory = require('./ItemCategory')

class Category extends Model {}
Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize
})

Category.belongsToMany(Item, { through: ItemCategory, foreignKey: 'category' })

module.exports = Category
