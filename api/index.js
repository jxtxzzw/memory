const router = require('./router')

require('./User')
require('./Comment')
require('./auth')
require('./Type')

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
