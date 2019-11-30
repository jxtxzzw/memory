
const Comment = require('./Comment')
const Rating = require('./Rating')
const Category = require('./Category')
const ItemCategory = require('./ItemCategory')
const Item = require('./Item')
// const Tag = require('./Tag')
// const ItemTag = require('./ItemTag')
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: 'category' })

Item.hasMany(Comment, { foreignKey: 'item' })
Item.hasMany(Rating, { foreignKey: 'item' })
Item.belongsToMany(Category, { through: ItemCategory, foreignKey: 'item' })
// Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'item', constraints: false })

module.exports = Item
module.exports = Category
