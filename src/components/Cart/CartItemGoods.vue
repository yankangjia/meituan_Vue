<style scoped>
.goods-container >>> .van-checkbox{
  width: 27px;
  float: left;
}
</style>
<style lang="scss" scoped>
.goods-container{
  display: flex;
  margin: 5px 0;
  .goods-thumbnail{
    float: left;
    width: 65px;
    height: 65px;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods-info-group{
    flex: 1;
    float: left;
    position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
    .goods-name{
      font-size: 15px;
    }
    .goods-hint{
      font-size: 13px;
      color: #999;
    }
    .goods-price-group{
      position: absolute;
      bottom: 0px;
      width: 100%;
      .goods-count{
        float: left;
        font-size: 14px;
        color: #aaa;
      }
      .goods-original-price{
        float: right;
        font-size: 13px;
        color: #999;
        margin-right: 5px;
        text-decoration:line-through
      }
      .goods-total-price{
        float: right;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
}

</style>

<template>
  <div class="goods-container">
    <van-checkbox v-model="checked" checked-color="#f8c74e"></van-checkbox>
    <div class="goods-thumbnail">
      <img :src="goods.picture" alt="">
    </div>
    <div class="goods-info-group">
      <div class="goods-name">{{ goods.name }}</div>
      <div class="goods-hint">含1份折扣商品</div>
      <div class="goods-price-group">
        <div class="goods-count">{{ goods.count }}</div>
        <div class="goods-total-price">￥{{ goods.price*goods.count }}</div>
        <div class="goods-original-price">￥{{ goods.price*goods.count }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Checkbox } from "vant"

export default {
  name: "cart-item-goods",
  data: function(){
    return {
      checked: true
    }
  },
  components: {
    [Checkbox.name]: Checkbox
  },
  props: {
    goods: {
      type: Object,
      required: true
    }
  }
}
</script>
