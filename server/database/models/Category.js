const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

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

module.exports = Category
