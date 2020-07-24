<style scoped>
  .search-group >>> .van-search{
    padding: 0;
  }
  .van-dropdown-menu >>> .van-dropdown-menu__title{
    color: #767676;
  }
  .van-dropdown-menu__item{
    font-size: 14px;
    color: #767676;
  }
  .main-group >>> .van-dropdown-item{
    top: 95px !important;
  }
</style>

<style lang="scss" scoped>
.header-group{
  background: #444;
  padding: 20px 14px 10px;
  .address-group{
    i{
      font-size:16px;
      color: #fff;
    }
    .address{
      font-size:16px;
      color: #fff;
    }
  }
  .search-group{
    margin-top:10px;
  }
}
.filter-group{
  overflow: hidden;
    h2{
      margin: 15px 10px 10px;
    }
}
.main-group{
  overflow: hidden;
  .merchant-list{
    padding: 0 5px;
    a{
      display: block;
      overflow: hidden;
      .merchant-item{
        display: flex;
        padding: 10px;
        .logo{
          width: 80px;
          height: 60px;
          margin: 7px 0;
        }
        .merchant-info{
          margin-left: 10px;
          .merchant-name{
            font-size: 20px;
            font-weight: 700;
            color: #000;
          }
          .rate-group{
            margin-top: 4px;
          }
          .tag-group{
            margin-top: 4px;
            span{
              font-size: 12px;
              margin-right: 4px;
            }
            
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="home-container">
    <div class="header-group">
      <div class="address-group">
        <i class="iconfont icon-location"></i>
        <span class="address">三里屯</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="search-group">
        <van-search placeholder="请输入搜索关键词" v-model="keyword" @input="onInput" :clearable="true" @clear="onClear"/>
      </div>
    </div>
    <div class="filter-group">
      <h2>推荐商家</h2>
      <van-dropdown-menu>
        <van-dropdown-item v-model="sort" :options="sorts" />
        <div class="van-dropdown-menu__item">距离最近</div>
        <div class="van-dropdown-menu__item">品质联盟</div>
        <div class="van-dropdown-menu__item">筛选<i class="iconfont icon-funnel"></i></div>
      </van-dropdown-menu>
    </div>
    <div class="main-group" ref="main" :style="mainStyle">
      <div class="merchant-list">
        <router-link :to="'/merchant/' + merchant.id" v-for="merchant in display_merchants" :key="merchant.id">
          <div class="merchant-item">
            <img class="logo" :src="merchant.logo" alt="">
            <div class="merchant-info">
              <div class="merchant-name">{{merchant.name}}</div>
              <div class="rate-group">
                <van-rate v-model="rate" size="17px" />
              </div>
              <div class="tag-group">
                <van-tag plain>美团专送</van-tag>
                <van-tag plain>家常菜</van-tag>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Search, DropdownMenu, DropdownItem, Rate, Tag } from 'vant'
import BScroll from 'better-scroll'

export default {
  name: "Home",
  data: function(){
    return {
      merchants: [],
      rate: 4,
      sort: 0,
      sorts: [
        { text: '综合排序', value: 0 },
        { text: '好评优先', value: 1 },
        { text: '销量最高', value: 2 },
        { text: '距离最近', value: 3 }
      ],
      scroll,
      page: 1,
      searchFunc: null,
      searchResults: [],
      keyword: ''
    }
  },
  components: {
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Rate.name]: Rate,
    [Tag.name]: Tag,
  },
  computed: {
    mainStyle(){
      const leftHeight = 95 + 99 + 50
      const phoneHeight = 667
      const mainHeight = (phoneHeight - leftHeight)/37.5 + 'rem'
      return {
        height: mainHeight
      }
    },
    display_merchants(){
      return this.searchResults.length>0 ? this.searchResults : this.merchants
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.main,{
      scrollY: true,
      click: true,
      // 上拉加载更多，threshold：距离底部多少时开始执行函数，stop：回弹停留的距离
      pullUpLoad: {
        threshold: 0,
        // stop: 50
      }
    })
    // 绑定事件 上拉时触发
    this.scroll.on('pullingUp',() => {
      this.getMerchants(this.page+1)
    })

    this.getMerchants(1)

  },
  methods: {
    getMerchants(page){
      this.$http.getMerchants(page).then(res => {
        if(res.data && res.data.results && res.data.results.length > 0){
          this.page = page
          this.merchants = this.merchants.concat(res.data.results)
        }
        // 刷新滚动条
        this.scroll.refresh()
        // 上拉请求结束
        this.scroll.finishPullUp()
      })
    },
    // 防抖函数
    debounce(callback){
      let timer = null  // timer始终是同一个
      return function(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          callback(value)
        },500)
      }
    },
    onInput(value){   // 搜索   value：输入框当前值
      if(value == ''){
        this.searchResults = []
        return
      }
      if(!this.searchFunc){
        this.searchFunc = this.debounce((valueArg) => {
          // 请求
          if(valueArg){
            this.$http.searchMerchants(valueArg).then(res => {
              this.searchResults = res.data
            })
          }
        })
      }
      this.searchFunc(value)
    },
    // 清除搜索框时触发
    onClear(){
      this.searchResults = []
    }
  }
}
</script>


