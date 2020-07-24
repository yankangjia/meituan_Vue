<style lang="scss" scoped>
.cart-container {
  position: absolute;
  bottom: 120px;
  right: 15px;
  border: 1px solid #aaa;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: block;
  text-align: center;
  z-index: 100;
  background: #fff;
  // background: #f8c74e;
  i {
    line-height: 35px;
    color: #777;
  }
  .badage{
    width: 16px;
    height: 16px;
    background: red;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    position: absolute;
    top: -5px;
    right: -5px;
  }
}
</style>

<template>
  <div class="cart-container" @click="toCartGlobal">
    <van-icon name="shopping-cart-o" size="22px"/>
    <div class="badage" v-show="totalCount > 0">{{totalCount}}</div>
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
  computed: {
    totalCount: function(){
      return this.$store.getters.merchant_count()
    }
  },
  methods: {
    toCartGlobal(){
      this.$router.push({name:'cart'})
    }
  }
}
</script>
