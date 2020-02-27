const sequelize = require('../index')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Comment extends Model {}
Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.TEXT('long'),
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
