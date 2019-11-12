const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'dev_db.sqlite'
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
