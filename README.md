匹配原理：
1、main主应用的配置
1.1 注册微应用
registerMicroApps([
{
   name: 'micro-vue2',
	entry: '/subprefix/', // 固定前缀1
	container: '#subapp-viewport2',
	activeRule: '/subapp',
	props: {}
},
])
1.2 vue.config.js设置proxy代理转发
proxy: {
      "/subprefix": { // 固定前缀2
        target: "http://localhost:8085/",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    }
1.3 router配置
{
    path: '/subapp/:pathMatch(.*)*',
    name: 'subapp',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
1.4 挂载container定义，AboutView.vue
......
<div id="subapp-viewport2"></div>
mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  }
  ......
2、sub-app微应用
2.1 vue.config.js配置publicPath
publicPath: '/subprefix/', // 固定前缀3
