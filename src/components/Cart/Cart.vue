<style lang="scss" scoped>
.cart-container{
    background-color: rgb(230,230,230);
}
</style>

<template>
  <div class="cart-container">
    <mt-nav-bar title='购物车' leftArrowStyle="black"></mt-nav-bar>
    <cart-item v-for="merchant of cart_merchants" :key="getFirstValue(merchant)" :merchant="merchant"></cart-item>
  </div>
</template>

<script type="text/ecmascript-6">
import MTNavBar from '../Common/MTNavBar'
import CartItem from './CartItem'

export default {
  name: "Cart",
  data: function(){
    return {
      cart_merchants: {}
    }
  },
  components: {
    [MTNavBar.name]: MTNavBar,
    [CartItem.name]: CartItem
  },
  mounted(){
    // 从vuex中获取所有购物车的数据
    let result = this.$store.getters.all_cart_goods()
    let cart_merchants = result.cart_merchants
    let cart_goods_id = result.cart_goods_id
    // 如果购物车有数据
    if(JSON.stringify(cart_merchants) != '{}'){
      // 重新从后台获取商品信息，以免商品信息发生变化，只获取购物车中的商品信息
      this.$http.getGoodses(cart_goods_id).then(res => {
        let new_goods_list = res.data
        let new_goodses = {}
        for(let goods of new_goods_list){
          new_goodses[goods.id] = goods
        }
        for(let merchant of Object.values(cart_merchants)){
          for(let goods of Object.values(merchant)){
            if(new_goodses.hasOwnProperty(goods.id)){
              // 将新的商品信息赋值给旧的商品信息
              let new_goods = new_goodses[goods.id]
              for(let key in new_goods){
                if(key == 'count'){
                  continue
                }
                goods[key] = new_goods[key]
              }
            } else{
              // 如果当前购物车商品被删除，则删除
              for(let category of this.$store.cart[merchant.id]){
                if(category.id == goods.category_id){
                  for(let index=0;index<category.goods_list.length;index++){
                    let current_goods = category.goods_list[index]
                    if (current_goods.id == goods.id){
                      category.goods_list.splice(index,1)
                      break
                    }
                  }
                  break
                }
              }
            }
          }
        }
      })
    }
    this.cart_merchants = cart_merchants
  },
  methods: {
    getFirstValue(merchant){
      for(const goods of Object.values(merchant)){
        return goods.id
      }
    }
  }
}
</script>
