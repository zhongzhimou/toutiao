// vue构造函数
import Vue from 'vue'
// APP组件 以.vue结尾的文件都是组件
import App from './App.vue'
// 路由对象
import router from './router'

// 上线是否提示信息
Vue.config.productionTip = false

// 根实例
// $mount相当于el:
new Vue({
  // 路由对象
  router,
  // 加载的第一个组件,最底层的组件,写法固定
  render: h => h(App)
}).$mount('#app')
