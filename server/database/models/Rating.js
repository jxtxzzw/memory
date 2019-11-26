const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

const sequelize = require('../index')

const User = require('./User')
const Item = require('./Item')

class Rating extends Model {}
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
}, { hooks: {
  afterCreate (instance, options) {
    Rating.findOne({
      where: {
        item: instance.item,
        rating: {
          [Op.gt]: 0
        }
      },
      attributes: { include: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']] }
    }).then((projects) => {
      Item.update({
        rating: projects.dataValues.avg
      }, {
        where: {
          id: projects.id
        }
      })
    })
  },
  afterUpdate (instance, options) {
    Rating.findOne({
      where: {
        item: instance.item,
        rating: {
          [Op.gt]: 0
        }
      },
      attributes: { include: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg']] }
    }).then((projects) => {
      Item.update({
        rating: projects.dataValues.avg
      }, {
        where: {
          id: projects.id
        }
      })
    })
  }
},
sequelize
})

// TODO 未完成的 hooks，需要先写完其他接口进行测试

module.exports = Rating
