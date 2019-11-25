const Sequelize = require('sequelize')
const Model = Sequelize.Model

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
    Rating.findAll({
      where: {
        item: instance.item
      },
      attributes: [Model.sequelize.fn('AVG', Model.sequelize.col('rating'), 'avgRating')]
    }).then((projects) => {
      console.log(projects)
    })
  },
  afterUpdate (instance, options) {
    Rating.findAll({
      where: {
        item: instance.item
      },
      attributes: [Model.sequelize.fn('AVG', Model.sequelize.col('rating'), 'avgRating')]
    }).then((projects) => {
      console.log(projects)
    })
  }
},
sequelize
})

// TODO 未完成的 hooks，需要先写完其他接口进行测试

module.exports = Rating
