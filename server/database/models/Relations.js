
const Category = require('./Category')
const ItemCategory = require('./ItemCategory')
const Item = require('./Item')
const Tag = require('./Tag')
const ItemTag = require('./ItemTag')

Category.belongsToMany(Item, { through: ItemCategory, foreignKey: 'category' })

Item.belongsToMany(Category, { through: ItemCategory, foreignKey: 'item' })
Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'item' })
Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tag' })

module.exports = Item
module.exports = Category
module.exports = Tag
