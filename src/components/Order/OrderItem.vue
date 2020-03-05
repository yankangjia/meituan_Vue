<style scoped>
.order-header >>> .van-icon-arrow{
  line-height: 40px;
}
</style>

<style lang="scss" scoped>
.order-item-group{
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  &:last-of-type{
    border-bottom: none;
  }
  .order-header{
    display: flex;
    justify-content: center;
    color: #000000;
    .logo{
      width: 48px;
      height: 36px;
      margin-top: 2px;
    }
    .merchant-name{
      flex: 1;
      font-size: 20px;
      line-height: 40px;
      padding-left: 15px;
    }
  }
  .order-body{
    margin: 5px 0;
    .goods-group{
      ul{
        padding: 7px 0;
        li{
          overflow: hidden;
          .goods-name{
            float: left;
            font-size: 15px;
            color: #666;
          }
          .goods-amount{
            float: right;
            font-size: 15px;
            color: #666;
          }
        }
      }
    }
    .order-info{
      overflow: hidden;
      .order-create-time{
        float: left;
        font-size: 15px;
      }
      .order-total-price{
        float: right;
        font-size: 15px;
      }
    }
  }
  .order-footer{
    display: flex;
    .goods-status{
      flex: 1;
      font-size: 18px;
      color: #999;
      line-height: 38px;
    }
    .button-group{
      overflow: hidden;
      .repeat-order{
        float: right;
        height: 38px;
        line-height: 38px;
        padding: 0 12px;
        font-size: 15px;
      }
      .comment{
        float: right;
        height: 38px;
        line-height: 38px;
        padding: 0 12px;
        margin-right: 10px;
        font-size: 15px;
      }
    }
  }
}
</style>

<template>
  <div class="order-item-group">
    <router-link :to="{name:'merchant',params:{merchant_id:order.merchant.id}}" class="order-header">
      <img class="logo" :src="order.merchant.logo" alt="">
      <div class="merchant-name">肯德基</div>
      <van-icon name="arrow" size="20"></van-icon>
    </router-link>
    <router-link to="" class="order-body">
      <!-- 商品列表 -->
      <div class="goods-group">
        <ul>
          <li v-for="goods in order.goods_list" :key="goods.list">
            <span class="goods-name">{{goods.name}}</span>
            <span class="goods-amount">×1</span>
          </li>
        </ul>
      </div>
      <div class="order-info">
        <span class="order-create-time">2020-01-21 00:24</span>
        <span class="order-total-price">实付￥{{order.total_price}}</span>
      </div>
    </router-link>
    <div class="order-footer">
      <div class="goods-status">{{display_status}}</div>
      <div class="button-group" v-if="status == 1">
        <van-button type="warning" class="repeat-order">去支付</van-button>
        <van-button type="default" class="comment">修改</van-button>
      </div>
      <div class="button-group" v-else-if="status == 2">
        <van-button type="warning" class="repeat-order">修改订单</van-button>
        <van-button type="default" class="comment">催单</van-button>
      </div>
      <div class="button-group" v-else-if="status == 3">
        <van-button type="warning" class="repeat-order">确认收货</van-button>
        <van-button type="default" class="comment">联系骑手</van-button>
      </div>
      <div class="button-group" v-else-if="status == 4">
        <van-button type="warning" class="repeat-order">再来一单</van-button>
        <van-button type="default" class="comment">去评价</van-button>
      </div>
      <div class="button-group" v-else-if="status == 5">
        <van-button type="warning" class="repeat-order">再来一单</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Icon,Button } from 'vant';
  export default {
    name: "mt-order-item",
    data: function(){
      return {}
    },    
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    computed: {
      status(){
        return this.order.order_status
      },
      display_status(){
        const display = {
          1:'待支付',
          2:'待发货',
          3:'配送中',
          4:'待评价',
          5:'已完成'
        }
        return display[this.status]
      }
    },
    components: {
      [Icon.name]: Icon,
      [Button.name]: Button
    },
  }
</script>

