<style scoped>
.cart-item-container >>> .van-checkbox__label{
  font-size: 15px;
}
.cart-item-header >>> .van-checkbox{
  width: 28px;
  height: 22px;
}
</style>
<style lang="scss" scoped>
.cart-item-container{
  border-radius: 5%;
  margin: 10px 10px;
  overflow: hidden;
  .cart-item-header{
    display: flex;
    padding: 10px;
    background-color: rgb(245,245,245);
    .header-info{
      flex: 1;
      .merchant-name{
        font-size: 15px;
      }
      .discounts-group{
        margin-top: 5px;
        overflow: hidden;
        li{
          color: #f33;
          float: left;
          margin-right: 6px;
          border: 1px solid #f33;
          padding: 0 2px;
          border-radius: 3px;
        }
      }
    }
  }
  .cart-item-body{
    padding: 10px;
    background-color: rgba(255,255,255,1);
  }
}
</style>

<template>
  <div class="cart-item-container">
    <div class="cart-item-header">
      <van-checkbox v-model="checked" checked-color="#f8c74e"></van-checkbox>
      <div class="header-info">
        <div class="merchant-name">炸串联盟拌饭（西客站店）</div>
        <!-- 优惠 -->
        <ul class="discounts-group">
          <li>30 减 5</li>
          <li>40 减 8</li>
          <li>60 减 12</li>
          <li>100 减 20</li>
        </ul>
      </div>
    </div>
    <div class="cart-item-body">
      <cart-item-goods v-for="goods of merchant" :key="goods.id" :goods="goods"></cart-item-goods>
    </div>
    <div class="cart-item-footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Checkbox } from "vant"
import CartItemGoods from "./CartItemGoods"

export default {
  name: "cart-item",
  data: function(){
    return {
      checked: true,
    }
  },
  props: {
    merchant: {
      type: Object,
      required: true
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CartItemGoods.name]: CartItemGoods
  },
  mounted(){
    console.log(this.merchant)
  }
}
</script>