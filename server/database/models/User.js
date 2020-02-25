const sequelize = require('../index')
const { Item, Rating } = require('./Item')
const Comment = require('./Comment')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Subscript extends Model {}
Subscript.init({
  identifier: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  user: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, { sequelize })

class Subscription extends Model {}
Subscription.init({
  identifier: {
    type: Sequelize.STRING,
    primaryKey: true
  }
}, {
  hooks: {
    async afterCreate (instance, options) {
      const users = await User.findAll({
        attributes: ['id'],
        transaction: options.transaction
      })
      for (const user of users) {
        await Subscript.create({
          subscript: instance.identifier,
          user: user.id
        }, {
          transaction: options.transaction
        })
      }
    }
  },
  sequelize
})

class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: Sequelize.UUID,
    unique: true
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
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
  hooks: {
    async afterCreate (instance, options) {
      const subscriptions = await Subscription.findAll({
        attributes: ['identifier'],
        transaction: options.transaction
      })
      for (const subscription of subscriptions) {
        await Subscript.create({
          subscript: subscription.identifier,
          user: instance.id
        }, {
          transaction: options.transaction
        })
      }
    }
  },
  sequelize
})

User.hasMany(Item, { foreignKey: 'creator' })
User.hasMany(Item, { foreignKey: 'updater' })
User.hasMany(Comment, { foreignKey: 'user' })
User.hasMany(Rating, { foreignKey: 'user' })
Subscription.belongsToMany(User, { through: Subscript, foreignKey: 'subscription' })
User.belongsToMany(Subscription, { through: Subscript, foreignKey: 'user' })

module.exports = { User, Subscription, Subscript }
