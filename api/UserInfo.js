const { User } = require('../server/database/models/User')

async function getUserEmail (id) {
  let users = []
  const emails = []
  if (id === 0) {
    users = await User.findAll({
      attributes: [
        'email'
      ]
    })
  } else {
    users = await User.findAll({
      where: {
        id
      },
      attributes: [
        'email'
      ]
    })
  }
  for (const user of users) {
    emails.push(user.email)
  }
  return emails
}

module.exports = { getUserEmail }
