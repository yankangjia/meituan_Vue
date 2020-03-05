<style lang="scss" scoped>
.head-group{
  background: #2E2F3B;
  padding: 10px;
  display: flex;
  margin-top: -46px;
  padding-top: 46px;
  .logo{
    width: 80px;
    height: 60px;
  }
  .merchant-info{
    flex: 1;
    margin-left: 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .delivery-info{

    }
    .name{
      font-size: 18px;
    }
    .notice{
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow:hidden;
    }
  }
}
.tab-group{
  .menu-group{
    display: flex;
    // 分类列表
    .category-group{
      width: 80px;
      height: 100%;
      text-align: center;
      // background-color: pink;
      overflow: hidden;
      .category-list{
        li{
          height: 50px;
          line-height: 50px;
          &.active{
            background-color: #ddd;
          }
        }
      }
    }
    // 商品列表
    .goods-group{
      padding-left: 10px;
      height: 100%;
      flex: 1;
      overflow: hidden;
      // background: olive;
      .goods-list{
        .category-name{
          font-size: 14px;
        }
        .goods-item{
          display: flex;
          padding: 5px 0;
          height: 75px;
          .thumbnail{
            width: 75px;
            height: 75px;
          }
          .goods-info{
            flex: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .goods-name{
              font-size: 16px;
              font-weight: 700;
            }
            .goods-info-bottom{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .price{
                font-size: 16px;  
                font-weight: 700;
                color: #fb4e44;
              }
            }
          }
        }
      }

    }
  }
}
</style>

<template>
  <div class="merchant-container">
    <mt-nav-bar></mt-nav-bar>
    <div class="head-group">
      <img class="logo" :src="merchant.logo" alt="">
      <div class="merchant-info">
        <div class="name">{{merchant.name}}</div>
        <div class="delivery-info">
          <span>20分钟</span> | <span>1km</span>
        </div>
        <div class="notice">
          公告：{{merchant.notice}}
        </div>
      </div>
    </div>
    <van-tabs class="tab-group" v-model="active">
      <!-- 点菜页面 -->
      <van-tab title="点菜">
        <div class="menu-group" :style="menuHeightStyle">
          <!-- 分类列表 -->
          <div class="category-group" ref="category">
            <ul class="category-list">
              <li :class="index==currentIndex?'active':''" v-for="(category, index) in categories" :key="category.name" @click="categoryClick(index)">
                {{category.name}}
              </li>
            </ul>
          </div>
          <!-- 商品列表 -->
          <div class="goods-group" ref="goods">
            <div class="goods-list">
              <dl class="goods-dl" v-for="(category) in categories" :key="category.name">
                <dt class="category-name">{{category.name}}</dt>
                <dd class="goods-item" v-for="(goods) in category.goods_list" :key="goods.id" @click="goodsClick(goods)">
                  <img class="thumbnail" :src="goods.picture" alt="">
                  <div class="goods-info">
                    <div class="goods-name">{{goods.name}}</div>
                    <div class="month-sale">月售10份</div>
                    <div class="goods-info-bottom">
                      <div class="price">￥{{goods.price}}</div>
                      <stepper v-model="goods.count"></stepper>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- 评价页面 -->
      <van-tab title="评价">这是评价</van-tab>
      <!-- 商家页面 -->
      <van-tab title="商家">这是商家</van-tab>
    </van-tabs>
    
    <!-- 商品详情 -->
    <goods-detail :goods="detailGoods"></goods-detail>
    <!-- 购物车 -->
    <cart :categories="categories" :merchant_id='merchant_id'></cart>
  </div>
</template>

<script type="text/ecmascript-6">
import MTNavBar from "../Common/MTNavBar"
import { Tab, Tabs } from 'vant';
import BScroll from "better-scroll";
import GoodsDetail from "./GoodsDetail"
import Stepper from "./Stepper"
import Cart from "./Cart"

export default {
  name: "Merchant",
  components: {
    [MTNavBar.name]: MTNavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [GoodsDetail.name]: GoodsDetail,
    [Stepper.name]: Stepper,
    [Cart.name]: Cart
  },
  data: function(){
    return {
      merchant_id: null,
      currentIndex: 0,
      active: 0,
      merchant: {},
      categories: [],
      positions: [],      // 每个dl距离顶部的长度
      detailGoods: undefined,
      goodsScroll: null,
      categoryScroll: null,
    }
  },
  methods: {
    // 切换分类
    categoryClick(index){
      this.currentIndex = index
      const position = this.positions[index]
      this.goodsScroll.scrollTo(0, -position, 500)
    },
    // 点击商品弹出详情页面
    goodsClick(goods){
      // 新建内存空间，触发goods-detail的watch事件
      this.detailGoods = JSON.parse(JSON.stringify(goods))
    }
  },
  computed: {
    menuHeightStyle(){
      const height = window.innerHeight - 165;
      return {
        height: height + "px"
      }
    },
  },
  mounted(){
    this.$nextTick(() => {
      // 设置分类列表为滚动
      this.categoryScroll = new BScroll(this.$refs.category,{
        scrollY: true,  // 垂直方向滚动
        click: true,  // 允许点击
      })

      // 设置商品列表为滚动x 
      this.goodsScroll = new BScroll(this.$refs.goods,{
        scrollY: true,
        click: true,
        probeType: 2,
      })
      this.goodsScroll.on('scroll',(pos) => {
        const y = Math.abs(pos.y)
        const positions = this.positions
        for(let index=positions.length-1; index>=0; index--){
          const position = positions[index]
          if(y >= position){
            this.currentIndex = index
            break
          }
        }
      })
    })


    // 获取商家信息
    const merchant_id = this.$route.params.merchant_id
    this.merchant_id = merchant_id
    this.$http.getMerchant(merchant_id).then(res => {
      this.merchant = res.data
    })

    let cart_goodses = {}
    cart_goodses = this.$store.getters.goods_list(this.merchant_id).cart_goodses

    this.$http.getCategories(merchant_id).then(res => {
      const categories = res.data
      // 初始化局部购物车
      const goods_exists = JSON.stringify(cart_goodses) != '{}'
      for(let category of categories){
        for(let goods of category.goods_list){
          if(goods_exists && cart_goodses.hasOwnProperty(goods.id)){
            // 如果商品在购物车中，则将购物车中商品数量赋值给当前页
            goods.count = cart_goodses[goods.id].count
          } else{
            goods.count = 0
          }
        }
      }
      this.categories = categories

      /**
       * 获取到分类列表后数据并不会直接渲染到dom上，需要在nextTick中获取到dom元素及其高度。
       * 到下一个tick中，categories被渲染到模板中，此时出现了分类列表和商品列表，此时也就能获取到元素高度。
       */
      this.$nextTick(() => {
        // 计算positions
        const dlList = document.getElementsByClassName("goods-dl")
        const positions = [0]
        let offset = 0
        for(let dl of dlList){
          const height = dl.clientHeight 
          offset += height
          positions.push(offset)
        }
        this.positions = positions

        // 设置分类和商品height
        let goodsList = document.getElementsByClassName("goods-list")[0]
        goodsList.style.height = goodsList.offsetHeight + 70 + "px"
        let categoryList = document.getElementsByClassName("category-list")[0]
        categoryList.style.height = categoryList.offsetHeight + 70 + "px"

        this.categoryScroll.refresh()
        this.goodsScroll.refresh()
      })
    }) 
  }
}
</script>

