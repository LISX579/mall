import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "components/common/toast/index";
import Fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";


Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.use(toast)

//解决移动段300ms延迟
Fastclick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyload, {
  // loading: require('url')   未加载时显示的占位图片
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


