import appRouterConfig from './appRouterConfig'

const pipe = x => () => import(`@/views/${x}`)

let getRouter = (appRouterConfig) => {
  for (let i = 0; i < appRouterConfig.length; i++) {
    let { component, children } = appRouterConfig[i]
    appRouterConfig[i].component = pipe(component)
    if (children && children.length) {
      appRouterConfig[i].component = pipe(component)
      appRouterConfig[i].children = getRouter(children)
    }
  }
  return appRouterConfig
}

const appRouter = getRouter(appRouterConfig)

const defaultRouter = [
  { path: '/', redirect: '/index' }
]

export default [
  ...appRouter,
  ...defaultRouter
]
