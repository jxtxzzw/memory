const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

const sequelize = require('../index')

const User = require('./User')
const Item = require('./Item')

class Rating extends Model {
}

Rating.init({
  user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  item: {
    type: Sequelize.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
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
        attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg']]
      })

      await Item.update({
        rating: result[0].toJSON().avg
      }, {
        where: {
          id: instance.item
        }
      })
    }
  },
  sequelize
})

// TODO 未完成的 hooks，需要先写完其他接口进行测试

module.exports = Rating
