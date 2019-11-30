const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

class Tag extends Model {}
Tag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize
})

module.exports = Tag
