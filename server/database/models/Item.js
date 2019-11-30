const Sequelize = require('sequelize')
const Model = Sequelize.Model
const sequelize = require('../index')
const ItemTag = require('./ItemTag')
const ItemCategory = require('./ItemCategory')
const Comment = require('./Comment')
const Rating = require('./Rating')

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

Item.hasMany(Comment, { foreignKey: 'item' })
Item.hasMany(Rating, { foreignKey: 'item' })
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: 'category' })
Item.belongsToMany(Category, { through: ItemCategory, foreignKey: 'item' })
Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'item' })
Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tag' })

module.exports = {
  Item, Category, Tag
}
