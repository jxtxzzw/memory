const sequelize = require('../index')
const Subscript = require('./Subscript')
const User = require('./User')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Subscription extends Model {}
Subscription.init({
  identifier: {
    type: Sequelize.STRING,
    primaryKey: true,
  }
}, {
  sequelize
})

Subscription.belongsToMany(User, { through: Subscript, foreignKey: 'subscription' })
User.belongsToMany(Subscription, { through: Subscript, foreignKey: 'user' })

module.exports = Subscription
