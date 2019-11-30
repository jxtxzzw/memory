const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

const sequelize = require('../index')

const Item = require('./Item')

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
          id: instance.item
        },
        transaction: options.transaction
      })
    }
  },
  sequelize
})

module.exports = Rating
