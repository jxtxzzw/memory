const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index').sequelize()

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
}, {
  sequelize
})
