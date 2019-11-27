const router = require('./router')

// 中间件的顺序是重要的，auth 必须放在第一个，否则后面的就无法访问 req.user
require('./auth')
require('./User')
require('./Comment')
require('./Type')
require('./Category')
require('./upload')
require('./Item')
require('./Rating')

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
