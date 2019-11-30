const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')
const Item = require('./Item')
const ItemTag = require('./ItemTag')

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

Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tag' })

module.exports = Tag
