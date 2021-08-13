module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/builder-app/'
      : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Sterling Edmonton - Build Your Sterling Home'
    }
  },
  devServer: {
    proxy: {
      '/wp-json': {
        target: 'https://sterlingedmonton.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }
}