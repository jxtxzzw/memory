const sequelize = require('../index')
const { Item, Category } = require('./Item')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Type extends Model {}
Type.init({
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

Type.hasMany(Item, { foreignKey: 'type' })
Type.hasMany(Category, { foreignKey: 'type' })

module.exports = Type
