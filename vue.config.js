const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/']
      })
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true
        // },
        // '/img': {
        //   target: 'https://imgchr.com',
        //   pathRewrite: { '^/img': '/' },
        //   changeOrigin: true
        //   // secure: false
      }
    }
  }
}
