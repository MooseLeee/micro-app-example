import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/page/index'
import Scroll from '@/page/scroll'

import Example from './example'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/vue-app/home', component: Home },
    { path: '/vue-app/scroll', component: Scroll },
    ...Example,
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
