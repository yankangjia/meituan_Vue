import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
/**
 * cart 购物车结构：
 * {
 *   merchant_id: {
 *     goods_id: count,
 *     ...
 *   }
 *   ...
 * }
 */
const store = new Vuex.Store({
  state: {
    cart: {},
    editingAddress: {},
    selectedAddress: null
  },
  mutations: {
    // 添加商品
    addGoods(state,payload){
      const merchant_id = payload.merchant_id
      let goods = payload.goods
      const category_id = goods.category_id
      if(!state.cart.hasOwnProperty(merchant_id)){
        state.cart[merchant_id] = {}
      }
      let merchant = state.cart[merchant_id]
      if(!merchant.hasOwnProperty(category_id)){
        merchant[category_id] = {}
      }
      let category = merchant[category_id]
      if(!category.hasOwnProperty(goods.id)){
        category[goods.id] = goods
      }
      category[goods.id].count++
    },
    // 减少商品
    subtractGoods(state,payload){
      const merchant_id = payload.merchant_id
      let goods = payload.goods
      const category_id = goods.category_id
      if(state.cart.hasOwnProperty(merchant_id)){
        let merchant = state.cart[merchant_id]
        if(merchant.hasOwnProperty(category_id)){
          let category = merchant[category_id]
          if(category.hasOwnProperty(goods.id)){
            category[goods.id].count--
          }
        }
      }
    },

    setMerchantCart(state,data){
      const merchant_id = data.merchant_id
      const categories = data.categories
      state.cart[merchant_id] = categories
    },
    updateMerchantCart(state,data){
      const merchant_id = data.merchant_id
      const categories = data.categories
      state.cart[merchant_id] = categories
    },
    clearCart(state,merchant_id){
      if(state.cart.hasOwnProperty(merchant_id)){
        delete state.cart[merchant_id]
      }
    },
    setEditingAddress(state, address){
      state.editingAddress = address
    },
    clearEditingAddress(state){
      state.editingAddress = {}
    },
    setSelectedAddress(state,address){
      state.selectedAddress = address
    },
    clearSelectedAddress(state){
      state.selectedAddress = null
    }
  },
  getters: {
    // 返回购物车中的一个商家的 商品列表、商品id列表、商品对象{}
    goods_list: (state) => (merchant_id) => {
      // 从购物车中获取商品
      let cart_categories = []
      if(state.cart.hasOwnProperty(merchant_id)){
        cart_categories = state.cart[merchant_id]
      }
      let cart_goods_list = []
      let cart_goods_id_list = []
      let cart_goodses = {}
      if(cart_categories.length > 0){
        for(let category of cart_categories){
          for(let goods of category.goods_list){
            if(goods.count>0){
              cart_goods_list.push(goods)
              cart_goods_id_list.push(goods.id)
              cart_goodses[goods.id] = goods
            }
          }
        }
      }
      return {
        cart_goods_list,
        cart_goods_id_list,
        cart_goodses
      }
    },
    // 返回所有购物车
    all_cart_goods: (state,getters) => () => {
      let cart_merchants = {}
      let cart_merchants_goods_id = {}
      let cart_goods_id = []  // 所有商品id
      let cart = state.cart
      for(let merchant_id in cart){
        let result = getters.goods_list(merchant_id)
        cart_merchants[merchant_id] = result.cart_goodses
        cart_merchants_goods_id[merchant_id] = result.cart_goods_id_list
        cart_goods_id = cart_goods_id.concat(result.cart_goods_id_list)
      }
      console.log('================')
      console.log(cart_merchants)
      return {
        cart_merchants,
        cart_merchants_goods_id,
        cart_goods_id
      }
    },
  }
})

export default store