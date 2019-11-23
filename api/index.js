const router = require('./router')

require('./User')
require('./Comment')
require('./auth')
require('./Type')
require('./Tag')
require('./upload')

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
