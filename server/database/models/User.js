const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = require('../index')

const { Item, Rating } = require('./Item')
const Comment = require('./Comment')

class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  realname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true
  },
  latest: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  sequelize
})

User.hasMany(Item, { foreignKey: 'creator' })
User.hasMany(Item, { foreignKey: 'updater' })
User.hasMany(Comment, { foreignKey: 'user' })
User.hasMany(Rating, { foreignKey: 'user' })

module.exports = User
