const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const Item = require('./Item')

class Comment extends Model {}
Comment.init({
  id: {
    type: Sequelize.INTEGER,
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
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reply: {
    type: Sequelize.INTEGER,
    references: {
      model: Comment,
      key: 'id'
    }
  }
}, {
  sequelize
})

module.exports = Comment
