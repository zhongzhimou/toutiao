// vue构造函数
import Vue from 'vue'
// APP组件 以.vue结尾的文件都是组件
import App from './App.vue'
// 路由对象
import router from './router'
//引入提示模态框
import vant from 'vant'
// 引入插件axios
import axios from 'axios'

//注册vant 插件  Vue.use:都是注册插件的
Vue.use(vant);
//绑定到原型 -- 之后调用直接 this.$axios
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000'

// 上线是否提示信息
Vue.config.productionTip = false



//设置路由导航守卫
router.beforeEach((to, from, next) => {
  // to要去的页面 from从哪里来 next放行 
  // $router.push  写法错误
if(to.path=='/personal'){
  // 获取token值 同时还要转为对象 方便下一步做判断
  // 如果缓存中没有值也需要一个填入空对象   否则如果没有数据会返回null--null没有token属性,js会报错
  const userToken =JSON.parse(localStorage.getItem('userInfo')) || {};
  if (userToken.token) {
    // 如果有token 就自动执行跳转
    next();
  }else{
    // 如果有token 就执行跳转首页
    next('/login')
  }
}else{
  next();
}
})
// 根实例
// $mount相当于el:
new Vue({
  // 路由对象
  router,
  // 加载的第一个组件,最底层的组件,写法固定
  render: h => h(App)
}).$mount('#app')
