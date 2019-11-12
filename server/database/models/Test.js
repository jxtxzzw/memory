const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: 'dev_db.sqlite'
  }
)

class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      len: [3, 20]
    },
    defaultValue: 'jxtxzzw'
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'user'
})


// User.sync({ force: true }).then(() => {
//   // Now the `users` table in the database corresponds to the model definition
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

// Find all users
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
User.destroy({
  where: {
    firstName: "Jane"
  }
}).then(() => {
  console.log("Done");
});

// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
}).then(() => {
  console.log("Done");
});

