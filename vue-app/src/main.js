import './publicPath'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/app.scss'
// 引入第三方插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义组件
import Table from '@/components/table'
import Toolbar from '@/components/toolbar'
// 全局引用第三方插件
Vue.use(ElementUI)
// 全局注册自定义组件
Vue.component('cus-table', Table)
Vue.component('toolbar', Toolbar)

Vue.config.productionTip = false


export async function bootstrap() {
  console.log('vue app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount() {
  console.log('vue app mounted');
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log('vue app unmounted');
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
