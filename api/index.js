const router = require('./router')

require('./User')
require('./Comment')
require('./auth')
require('./Type')
require('./Tag')

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
