<style lang="scss" scoped>
.cart-container{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  .mask-bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
  }
  .cart-group{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    background: #fff;
    .hint{
      width: 100%;
      height: 20px;
      text-align: center;
      background: #fedece;
    }
    .cart-list-group{
      .cart-title-group{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background: #ddd;
        .clear-btn{
          i{
            font-size: 16px;
            padding-right: 5px;
          }
        }
      }
      .goods-list{
        li{
          padding: 10px;
          height: 30px;
          background: #fff;
          display: flex;
          align-items: center;
          .goods-info{
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
              font-size: 18px;
            }
            .price{
              color: #FB4E44;
              font-size: 15px;
            }
          }
          .stepper{
            // min-width: 97px;
          }
        }
      }
    }
  }
  .settle-group{
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    .hot-area{
      flex: 1;
      background: #3B3B3C;
      .shop-icon{
        width: 50px;
        height: 50px;
        position: absolute;
        left: 10px;
        bottom: 10px;
        background-image: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/03098cb323a0263fdbbb102c696433c5.png");
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: center;
        .badage{
          width: 16px;
          height: 16px;
          background: red;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          position: absolute;
          right: 0;
        }
      }
      .total-price{
        font-size: 20px;
        color: #fff;
        margin-left: 70px;
        line-height: 50px;
        .unit{
          font-size: 14px;
        }
      }
    }
    .settle-btn{
      background: #f8c74e;
      padding: 0 30px;
      font-size: 17px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

<template>
  <div class="cart-container" v-show="show">
    <div class="mask-bg" v-show="showGoods" @click="showGoods=false"></div>
    <div class="cart-group">
      <div class="hint">已满足起送价</div>
      <div class="cart-list-group" v-show="showGoods">
        <div class="cart-title-group">
          <span class="title">购物车</span>
          <span class="clear-btn" @click="clearCart"><i class="iconfont icon-delete"></i>清空购物车</span>
        </div>
        <ul class="goods-list">
          <li v-for="goods of goodsList" :goods="goods" :key="goods.name">
            <div class="goods-info">
              <span class="title">{{goods.name}}</span>
              <span class="price">￥{{goods.price}}</span>
            </div>
            <stepper class="stepper" v-model="goods.count"></stepper>
          </li>
        </ul>
      </div>
    </div>
    <div class="settle-group">
      <div class="hot-area" @click="showGoods=!showGoods">
        <div class="shop-icon">
          <div class="badage">{{totalCount}}</div>
        </div>
        <div class="total-price">
          <span class="unit">￥</span>{{totalPrice}}
        </div>
      </div>
      <div class="settle-btn" @click="gotoSettle">去结算</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Stepper from "./Stepper"

  export default {
    name: "cart",
    props: ["categories",'merchant_id'],
    data: function(){
      return {
        showGoods: false,
        goodses: {}
      }
    },
    components: {
      [Stepper.name]: Stepper
    },
    computed: {
      show(){
        if(this.goodsList.length > 0){
          // 将商品信息同步到全局购物车
          const data = {
            merchant_id: this.merchant_id,
            categories: this.categories
          }
          this.$store.commit('setMerchantCart',data)
          
          return  true
        } else{
          // this.showGoods = false
          this.setShowGoods(false)
          return false
        }
      },
      goodsList(){
        let goodsList = []
        for(let category of this.categories){
          for(let goods of category.goods_list){
            if(goods.count > 0){
              goodsList.push(goods)
            }
          }
        }
        return goodsList
      },
      totalPrice(){
        let total = 0
        for(let goods of this.goodsList){
          total += parseFloat(goods.price) * goods.count
        }
        return total
      },
      totalCount(){
        let total = 0
        for(let goods of this.goodsList){
          total += goods.count
        }
        return total
      }
    },
    methods: {
      // 清空购物车
      clearCart(){
        for(let goods of this.goodsList){
          goods.count = 0
        }
      },
      // 设置购物车商品列表是否展示
      setShowGoods(value){
        this.showGoods = value
      },
      // 去结算
      gotoSettle(){
        this.$router.push({path:'/submitorder/',query:{merchant_id:this.merchant_id}})
      }
    }
  }
</script>

