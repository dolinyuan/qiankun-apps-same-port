import {
    registerMicroApps,
    addGlobalUncaughtErrorHandler,
    start,
    initGlobalState,
    setDefaultMountApp,
    loadMicroApp
} from 'qiankun'

export default function () {
    // 注册子应用
    registerMicroApps([
/*            {
                name: 'micro-vue', // 微应用的名称，微应用之间必须确保唯一
                entry: '//localhost:2001', // 微应用的入口
                container: '#subapp-viewport', // 微应用的容器节点的选择器或者 Element 实例（此处表示渲染于主应用的subapp-viewport容器内）
                activeRule: '/vue', // 微应用的激活规则，浏览器 url 发生变化会调用 activeRule 里的规则，activeRule 任意一个返回 true 时表明该微应用需要被激活。
                props: { // 主应用需要传递给微应用的数据
                    test: 'props to vue: 给vue子项目的props',
                    loadMicroApp
                }
            },*/
            {
                name: 'micro-vue2',
                entry: '/subprefix/',
                container: '#subapp-viewport2',
                activeRule: '/subapp',
                props: {}
            },
        ],
        // LifeCycles，注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活
        {
            beforeLoad: [
                app => {
                    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
                }
            ],
            beforeMount: [
                app => {
                    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
                }
            ],
            afterMount: [
                app => {
                    console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
                }
            ],
            beforeUnmount: [
                app => {
                    console.log('[LifeCycle] before unmount %c%s', 'color: green;', app.name);
                }
            ],
            afterUnmount: [
                app => {
                    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
                }
            ]
        })

    // 添加全局的未捕获异常处理器
    addGlobalUncaughtErrorHandler((event) => {
        const {message} = event
        // 加载失败时提示
        if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
            console.log('微应用加载失败，请检查应用是否可运行', event)
        }
    })

    // 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法
    const actions = initGlobalState({msg: '通过globalstate，大家都可以用'})
    actions.onGlobalStateChange((state, prev) => {
        console.log('主应用获取到globalState Change', state, prev)
    }, true)

    // actions.setGlobalState(state)

 //   setDefaultMountApp('/vue2') // 设置主应用启动后默认进入的微应用

    start()
}
