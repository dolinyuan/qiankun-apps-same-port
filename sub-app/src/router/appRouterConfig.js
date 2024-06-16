/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-12-19 16:00:23
 * @LastEditTime: 2021-05-11 21:41:35
 * @LastEditors: astar
 */
export default [
  {
    name: 'vue-home',
    path: '/index',
    component: 'home.vue',
    meta: { title: 'vue子菜单' }
  },
  {
    name: 'vue-test',
    path: '/test',
    component: 'test.vue',
    meta: { title: 'vue test' },
    // children: [
    //   { path: 'test1', name: 'vue-test1', component: 'test1.vue', meta: { title: 'vue test1' } },
    //   { path: 'test2', name: 'vue-test2', component: 'test2.vue', meta: { title: 'vue test2' } }
    // ]
  }
]