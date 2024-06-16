const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/subprefix": {
        target: "http://localhost:8085/",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
})