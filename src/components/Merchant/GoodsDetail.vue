<style lang="scss" scoped>
.gd-container{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;    // 水平方向
  align-items: center;        // 垂直方向
  .middle-box{
    width: 315px;
    height: 475px;
    position: relative;
    .goods-detail{
      height: 390px;
      background-color: #fff;
      border-radius: 15px;
      overflow: hidden;
      padding: 15px;
      .picture{
        width: 100%;
        height: 236px;
      }
      .month-sale{
        font-size: 12px;
        margin-top: 10px;
      }
      .intro{
        font-size: 14px;
        margin-top: 10px;
        height:75px;
      }
      .price{
        margin-top: 10px;
        font-size: 18px;
        color: #fb4e44;
      }
    }
    .close-btn{
      width: 40px;
      height: 40px;
      background: url('http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/df125964473c5a2c4edadb74d8a11995.png');
      background-size: 40px;
      background-position: center;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left:50%;
      right: 50%;
      margin-left: -20px;
    }
  }
}
</style>

<template>
  <div class="gd-container" v-show="show">
    <div class="middle-box">
      <div class="goods-detail">
        <img class="picture" :src="goods.picture" alt="">
        <div class="month-sale">月售10份</div>
        <div class="intro">{{goods.intro}}</div>
        <div class="price">￥{{goods.price}}</div>
      </div>
      <div class="close-btn" @click="closeClick"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "goods-detail",
    data: function(){
      return {
        show: false
      }
    },
    watch:{
      // 内存空间发生变化，则触发watch事件
      goods(newValue, oldVaule){
        newValue
        oldVaule
        this.show = true
      }
    },
    props: {
      goods: {
        type: Object,
        default: function(){
          return {}
        }
      }
      
    },
    components: {},
    methods: {
      closeClick(){
        this.show = false
      }
    }
  }
</script>
