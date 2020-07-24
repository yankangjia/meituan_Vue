<template>
  <div id="app">
    <cart-global v-if="showCartGlobal"></cart-global>
    <router-view></router-view>
    <van-tabbar v-model="active" v-if="showTabBar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/orders">订单</van-tabbar-item>
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
    return {}
  },
  computed: {
    showTabBar(){
      const allowShow = ['home','orders','mine']
      const name = this.$route.name
      if(allowShow.indexOf(name) >=0 ){
        return true
      } else{
        return false
      }
    },
    active(){
      // 根据路径设置底部标签栏活跃状态    0 home
      const allowShow = ['home','orders','mine']
      const name = this.$route.name
      const index = allowShow.indexOf(name)
      if( index >=0 ){
        return index
      } else{
        return 0
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
