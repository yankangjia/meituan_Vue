import Login from "./components/Login"
import Vue from "vue"
import VueRouter from "vue-router"
import Home from "./components/Home"
import Mine from "./components/Mine"
import Merchant from "./components/Merchant/Merchant"
import SubmitOrder from "./components/SubmitOrder.vue"
import MTAddressList from "./components/MTAddressList"
import MTAddressEdit from "./components/MTAddressEdit"
import Orders from "./components/Order/Orders"
import auth from "./utils/auth"
import Cart from "./components/Cart/Cart"

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',     // 去掉url中的#
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/orders',
      component: Orders,
      name: 'orders',
      // 额外信息
      meta:{
        // 限制登录后才能访问
        requireAuth:true
      }
    },
    {
      path: '/mine',
      component: Mine,
      name: 'mine',
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/merchant/:merchant_id',
      component: Merchant,
      name: 'merchant'
    },
    {
      path: '/submitorder',
      component: SubmitOrder,
      name: 'submit_order',
      meta:{
        requireAuth:true
      }
    },
    {
      "path": '/address',
      component: MTAddressList,
      name: "address_list",
      meta:{
        requireAuth:true
      }
    },
    {
      "path": '/address/add',
      component: MTAddressEdit,
      name: "address_add",
      meta:{
        requireAuth:true
      }
    },
    {
      "path": '/address/edit',
      component: MTAddressEdit,
      name: "address_edit",
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/cart',
      component: Cart,
      name: 'cart',
    }
  ]
})

// router.js
// 到达某个路由之前执行的函数
router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth == true && !auth.is_authed){
    next({
      'name':'login',
      'query': {
        'from': to.path
      }
    })
  } else{
    next()
  }
})

export default router