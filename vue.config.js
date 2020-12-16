module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '/' },
        changeOrigin: true
      }
    }
  }
}
