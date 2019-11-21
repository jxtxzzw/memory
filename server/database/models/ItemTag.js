const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const Item = require('./Item')
const Tag = require('./Tag')

class ItemTag extends Model {}
ItemTag.init({
  id: {
    typr: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: Sequelize.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  tag: {
    type: Sequelize.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, sequelize)

module.exports = ItemTag
