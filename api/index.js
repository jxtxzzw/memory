const router = require('./router')

require('./User')
require('./Comment')
require('./auth')
require('./Type')
require('./Category')
require('./upload')
require('./Item')

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
