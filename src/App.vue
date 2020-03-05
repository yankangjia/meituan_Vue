<template>
  <div id="app">
    <cart-global v-if="showCartGlobal"></cart-global>
    <router-view></router-view>
    <van-tabbar v-model="active" v-if="showTabBar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import CartGlobal from './components/Common/CartGlobal'

export default {
  name: 'app',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [CartGlobal.name]: CartGlobal
  },
  data: function(){
    return {
      active: 0
    }
  },
  computed: {
    showTabBar(){
      const allowShow = ['home','order','mine']
      const name = this.$route.name
      if(allowShow.indexOf(name) >=0 ){
        return true
      } else{
        return false
      }
    },
    showCartGlobal(){
      const allowShow = ['home']
      const name = this.$route.name
      if(allowShow.indexOf(name) >= 0){
        return true
      } else{
        return false
      }
    }
  }
}
</script>

<style>
@import "./styles/init.css";
.van-search{
  padding:0;
}
</style>
