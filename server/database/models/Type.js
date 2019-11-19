const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

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

module.exports = Type
