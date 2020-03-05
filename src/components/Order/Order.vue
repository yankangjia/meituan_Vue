<template>
  <div class="order-container">
    <van-nav-bar title="我的订单"></van-nav-bar>
    <!-- 订单列表 -->
    <div class="order-list" ref="order" :style="orderListStyle">
      <div class="order-list-box">
        <mt-order-item v-for="order in orders" :key="order.id" :order="order"></mt-order-item>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import OrderItem from "./OrderItem"
import { NavBar } from 'vant';
import BScroll from 'better-scroll'
export default {
  name: "Order",
  data: function(){
    return {
      orders: [],
      orderScroll: null
    }
  },
  components: {
    [OrderItem.name]: OrderItem,
    [NavBar.name]: NavBar
  },
  computed:{
    orderListStyle(){
      const leftHeight = 50 + 55
      const phoneHeight = 667
      const orderListHeight = (phoneHeight - leftHeight)/37.5 + 'rem'
      return {
        height: orderListHeight
      }
    }
  },
  mounted(){
    this.orderScroll = new BScroll(this.$refs.order,{
      scrollY: true,
      click: true
    })

    this.$http.getOrders().then(res => {
      this.orders = res.data
      console.log(this.orders)
      this.orderScroll.refresh()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>