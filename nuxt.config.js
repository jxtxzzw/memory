const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  server: {
    host: 'localhost',
    port: process.env.MEMORY_SERVER_PORT || 3000
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'view-design/dist/styles/iview.css',
    'ant-design-vue/dist/antd.css',
    'assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/view-design',
    '@/plugins/antd-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    host: process.env.MEMORY_AXIOS_HOST || 'localhost',
    port: process.env.MEMORY_AXIOS_PORT || 3000,
    https: process.env.MEMORY_AXIOS_PORT === '443'
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/
  */
  auth: {
    cookie: {
      options: {
        expires: 1 // TODO: change to 3 days in production mode
      }
    },
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
      // TODO 增加 GitHub 登录
      // github: {
      //   client_id: process.env.GITHUB_CLIENT_ID,
      //   client_secret: process.env.GITHUB_CLIENT_SECRET
      // }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.urlencoded({
      limit: '5mb',
      extended: true
    }),
    bodyParser.json({
      limit: '5mb',
      extended: true
    }),

    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),

    // Api middleware
    '~/api'
  ]
}
