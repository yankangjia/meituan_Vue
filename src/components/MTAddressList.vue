<template>
  <div class="mt-address-list">
    <mt-nav-bar left-arrow-style="black" title="选择地址"></mt-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import { AddressList } from "vant"
  import MTNavBar from "./Common/MTNavBar"
  import Address from "../utils/address"
  export default {
    name: "MTAddressList",
    data: function(){
      return {
        chosenAddressId: '0',   // 选中的地址
        list: []
      }
    },
    components: {
      [AddressList.name]: AddressList,
      [MTNavBar.name]: MTNavBar
    },
    methods: {
      // 新增地址
      onAdd(){
        this.$router.push("/address/add")
      },
      // 编辑地址
      onEdit(item,index){
        index
        this.$store.commit("setEditingAddress", item)
        this.$router.push("/address/edit")
      },
      onSelect(item){
        this.$store.commit('setSelectedAddress',item)
        this.$router.back()
      }
    },
    mounted(){
      this.$http.getAddressList().then(res => {
        // 设置地址列表
        let addressList = res.data
        for(let index=0; index<addressList.length; index++){
          const address = addressList[index]
          if(address.is_default == true){
            this.chosenAddressId = address.id
          }
          addressList[index] = Address.convertToFront(address)
        }
        this.list = addressList
        // 选中已选择的地址
        const selectedAddress = this.$store.state.selectedAddress
        if(selectedAddress){
          this.chosenAddressId = selectedAddress.id
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>