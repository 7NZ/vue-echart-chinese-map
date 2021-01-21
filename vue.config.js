// vue.config.js, https://cli.vuejs.org/zh/config/
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  devServer: {
    port: 8082,
    // 代理
    proxy: {
      '/apis': {
        target: 'http://192.168.0.250:8088/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
}
