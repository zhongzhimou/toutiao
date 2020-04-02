import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    path:'/login',
    // @代表src这个目录
    // .vue可以忽略
    component: () => import('@/views/Login'),
  },
  {
    path:'/register',
    // @代表src这个目录
    // .vue可以忽略
    component: () => import('@/views/Register'),
  },
  {
    path:'/personal',
    component:() => import('@/views/Personal')
  },
  {
    path:'/edit-profile',
    component:() => import('@/views/EditProfile')
  },
  {
    path:'/comments',
    component:() => import('@/views/Comments')
  },
  {
    path:'/follow',
    component:() => import('@/views/Follow')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
