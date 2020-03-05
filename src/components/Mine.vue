<style lang="scss" scoped>
.mine-container{
  .mine-header{
    height: 160px;
    background: #f8c74e;
    overflow: hidden;
    .avatar-group{
      width: 75px;
      height: 75px;
      margin: 30px auto 8px;
      background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579590522406&di=94b45a38efae9625e79d4e413125cc80&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F02%2F20170902135603_2mYKC.thumb.700_0.jpeg");
      background-repeat: no-repeat;
      background-size: 75px;
      border-radius: 50%;
      border: 4px solid #fff;
    }
    .username{
      margin: 0 auto;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>

<template>
  <div class="mine-container">
    <div class="mine-header">
      <div class="avatar-group"></div>
      <div class="username">燕康佳</div>
    </div>
    <van-cell-group>
      <van-cell title="我的红包" is-link></van-cell>
      <van-cell title="收货地址" is-link></van-cell>
      <van-cell title="常见问题" is-link></van-cell>
      <van-cell title="协议与说明" is-link></van-cell>
      <van-cell title="退出登录" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Cell, CellGroup } from 'vant';
  export default {
    name: "Mine",
    data: function(){
      return {}
    },
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    }
  }
</script>

