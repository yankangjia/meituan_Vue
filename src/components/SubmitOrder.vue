<style lang="scss" scoped>
.goods-group{
  padding: 5px;
  background: #f8f8f8;
  display: flex;
  .thumbnail{
    width: 65px;
    height: 65px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info-group{
    flex: 1;
    .title-group{
      overflow: hidden;
      .goods-name{
        display: inline-block;
        float: left;
        font-size: 18px;
      }
      .price{
        display: inline-block;
        float: right;
        font-size: 16px;
      }
    }
    .amount{
      display: inline-block;
      font-size: 16px;
    }
  }

}


</style>

<template>
  <div class="so-container">
    <!-- 导航栏 -->
    <mt-nav-bar leftArrowStyle="black" title="确认订单"></mt-nav-bar>
    <!-- 地址 -->
    <van-cell-group>
      <van-cell title="请选择收货地址" icon="location-o" is-link to="/address">
        <template slot="title" v-if="address">
          <div class="user-info">
            <span>{{address.name}}</span>
            <span>{{address.tel}}</span>
          </div>
          <div class="address-info">
            {{address.address}}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 所选商品 -->
    <van-cell-group title="肯德基">
      <van-cell v-for="goods of goodsList" :key="goods.name">
        <template slot="title">
          <div class="goods-group">
            <div class="thumbnail">
              <img :src="goods.picture" alt="">
            </div>
            <div class="info-group">
              <div class="title-group">
                <span class="goods-name">{{goods.name}}</span>
                <span class="price">￥{{goods.price*goods.count}}</span>
              </div>
              <span class="amount">×{{goods.count}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 提交订单 -->
    <van-submit-bar
      :price="price*100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import MTNavBar from "./Common/MTNavBar"
  import { Cell, CellGroup, SubmitBar  } from 'vant'
  import Address from "../utils/address"
  export default {
    name: "SubmitOrder",
    components: {
      [MTNavBar.name]: MTNavBar,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SubmitBar.name]: SubmitBar,
    },
    data: function(){
      return {
        goodsList: [],
        address: null,
        merchant_id: null
      }
    },
    computed: {
      price(){
        let total = 0
        for(let goods of this.goodsList){
          total += goods.price * goods.count
        }
        return total
      }
    },
    mounted(){
      // 获取商品信息
      this.merchant_id = this.$route.query.merchant_id
      let result = this.$store.getters.goods_list(this.merchant_id)
      this.goodsList = result.cart_goods_list


      // 设置地址
      const selectedAddress = this.$store.state.selectedAddress
      if(selectedAddress){
        this.address = selectedAddress
      } else{
        this.$http.getDefaultAddress().then(res => {
          this.address = Address.convertToFront(res.data)
        })
      }
      
    },
    methods: {
      // 提交订单
      onSubmit(){
        const goods_list = []   // [{goods_id:xxxx, count:xxx}, {goods_id:xxxx, count:xxx}, ......]
        for(let goods of this.goodsList){
          goods_list.push({goods_id:goods.id, count:goods.count})
        }
        const data = {
          address_id: this.address.id,
          goods_list: goods_list,
          merchant_id: this.merchant_id
        }
        this.$http.submitorder(data).then(res => {
          // 清空购物车
          console.log(this.merchant_id)
          this.$store.commit('clearCart',this.merchant_id)
          // 创建好订单后请求alipay
          const pay_url = res.data.pay_url
          window.location = pay_url
        }) 
      } 
    }
  }
</script>
