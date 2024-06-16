/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-01-11 19:43:22
 * @LastEditTime: 2021-05-11 22:48:27
 * @LastEditors: astar
 */
/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import routerConfig from './router/index.js'
import VueRouter from 'vue-router';

let instance = null
let router = null

if (window.__POWERED_BY_QIANKUN__) {
  // 动态设置 webpack publicPath，防止资源加载出错
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

function render (props = {}) {
  
  if (props) {
    // Vue.prototype.$app = props // 将props挂在prototype上
    Vue.prototype.loadMicroApp = props.loadMicroApp
  }


  Vue.config.productionTip = false
  
  Vue.use(VueRouter)
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/subapp' : '/',
    mode: 'history',
    routes: routerConfig
  })

  router.beforeEach((to, from, next) => {
    console.log('sub app router >> ', to.name)
    /*if (!to.name) {
      location.href = '/404'
    } else {
      next();
    }*/
  });

  // 由于主应用渲染在#app上，为防止换用，增加判断，若使用了qiankun，则将子应用渲染在container下的#app中，若没有使用，则直接渲染在body下的#app中
  // 也可以为当前子应用定制一个不同名的渲染位置，但要同时修改子应用index.html和app.vue的id并且保证不跟主应用的id冲突
  const { container } = props
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

/**
 * 不存在主应用时可直接单独运行
 */
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap (props) {
  console.log('[vue] vue app bootstrap', props) // 此时获取不到container
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  console.log('[vue] vue app mount, props from main framework', props)
  props.onGlobalStateChange && props.onGlobalStateChange((state, prev) => {
    console.log(`[onGlobalStateChange - ${props.name}]:`, state, prev)
  }, true);
  props.setGlobalState && props.setGlobalState({ msg: 'vue子应用修改globalstate' })
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount (props) {
  console.log('[vue] vue app unmount, props from main framework', props)
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
