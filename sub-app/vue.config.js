const name = require('./package').name;

module.exports = {
  lintOnSave: false,
  publicPath: '/subprefix/',
  devServer: {
    port: 8085,
    headers: {
      'Access-Control-Allow-Origin': '*' // 解决开发环境跨域问题
    }
  },
  configureWebpack: { // 配置微应用打包工具，让主应用能正确识别微应用暴露出来的一些信息
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致${name}
      library: `${name}-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_${name} 即可
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
}