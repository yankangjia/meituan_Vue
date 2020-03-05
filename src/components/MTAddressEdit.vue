<template>
  <div class="mt-address-edit">
    <mt-nav-bar left-arrow-style="black" title="添加地址"></mt-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="addressInfo"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import MTNavBar from "./Common/MTNavBar"
  import { AddressEdit } from 'vant'
  import areaList from "../data/area"
  import Address from "../utils/address"
  export default {
    name: "mt-address-edit",
    data: function(){
      return {
        areaList,
        addressInfo: {}
      }
    },
    components: {
      [MTNavBar.name]: MTNavBar,
      [AddressEdit.name]: AddressEdit
    },
    computed: {
      isEditing(){
        if(this.$route.name == "address_edit"){
          return true
        } else{
          return false
        }
      }
    },
    mounted(){
      // 如果是编辑，则添加初始信息。
      if(this.isEditing){
        this.addressInfo = this.$store.state.editingAddress
      }
    },
    methods: {
      onSave(content){
        const address = Address.convertToServer(content)
        this.$toast.loading()
        if(!this.isEditing){
          // 添加地址
          this.$http.addAddress(address).then(() => {
            this.$toast.close()
            this.$toast.success()
            this.$router.back()
          })
        } else{
          // 修改地址
          this.$toast.loading()
          this.$http.updateAddress(address.id,address).then(() => {
            this.$toast.close()
            this.$toast.success()
            this.$router.back()
          })
        }
      },
      onDelete(){

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>