import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import startQiankun from './qiankun'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

startQiankun()
/*registerMicroApps([
  {
    name: 'micro-vue', // 微应用的名称，微应用之间必须确保唯一
    entry: '//localhost:2001', // 微应用的入口
    container: '#subapp-viewport', // 微应用的容器节点的选择器或者 Element 实例（此处表示渲染于主应用的subapp-viewport容器内）
    activeRule: '/vue', // 微应用的激活规则，浏览器 url 发生变化会调用 activeRule 里的规则，activeRule 任意一个返回 true 时表明该微应用需要被激活。
    props: { // 主应用需要传递给微应用的数据
      test: 'props to vue: 给vue子项目的props',
      loadMicroApp
    }
  },
  {
    name: 'sub-app',
    entry: 'http://localhost:8085',
    container: '#subapp-viewport2',
    activeRule: '/vue2',
    props: { data : store }
  },
/!*  {
    name: 'sub-app',
    entry: 'http://localhost:8085',
    container: '#appContainer',
    activeRule: '/about/sub-app',
    props: { data : store }
  }*!/
]);
start();*/
