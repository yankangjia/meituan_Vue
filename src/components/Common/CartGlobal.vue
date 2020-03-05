<style lang="scss" scoped>
.cart-container {
  position: absolute;
  bottom: 120px;
  right: 15px;
  border: 1px solid #aaa;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: block;
  text-align: center;
  z-index: 100;
  background: #fff;
  i {
    line-height: 40px;
    color: #777;
  }
}
</style>

<template>
  <div class="cart-container" @click="toCartGlobal">
    <van-icon name="shopping-cart-o" size="30px"/>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon } from 'vant'

export default {
  name: "cart-global",
  data: function(){
    return {}
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    toCartGlobal(){
      this.$router.push({name:'cart'})
    }
  }
}
</script>
