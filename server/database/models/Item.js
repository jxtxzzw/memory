const sequelize = require('../index')
const ItemTag = require('./ItemTag')
const ItemLink = require('./ItemLink')
const ItemCategory = require('./ItemCategory')
const Comment = require('./Comment')
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

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

class Link extends Model {}
Link.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  discription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
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

class Rating extends Model {
}

Rating.init({
  recursion: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  review: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  hooks: {
    async afterCreate (instance, options) {
      const result = await Rating.findAll({
        where: {
          item: instance.item,
          rating: {
            [Op.gt]: 0
          }
        },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg']],
        transaction: options.transaction
      })
      await Item.update({
        rating: result[0].toJSON().avg
      }, {
        where: {
          id: instance.item
        },
        transaction: options.transaction
      })
    },
    async afterUpdate (instance, options) {
      const result = await Rating.findAll({
        where: {
          item: instance.item,
          rating: {
            [Op.gt]: 0
          }
        },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg']],
        transaction: options.transaction
      })
      await Item.update({
        rating: result[0].toJSON().avg
      }, {
        where: {
          id: 1
        },
        transaction: options.transaction
      })
    }
  },
  sequelize
})

Item.hasMany(Comment, { foreignKey: 'item' })
Item.hasMany(Rating, { foreignKey: 'item' })
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: 'category' })
Item.belongsToMany(Category, { through: ItemCategory, foreignKey: 'item' })
Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'item' })
Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tag' })
Item.belongsToMany(Link, { through: ItemLink, foreignKey: 'item' })
Link.belongsToMany(Item, { through: ItemLink, foreignKey: 'link' })

module.exports = {
  Item, Category, Tag, Rating
}
