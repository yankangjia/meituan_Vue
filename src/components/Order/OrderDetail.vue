<style lang="scss" scoped>

</style>

<template>
  <div class="container">
    <MTNavBar :title="navBarTitle"></MTNavBar>
  </div>
</template>

<script type="text/ecmascript-6">
import MTNavBar from "../Common/MTNavBar"

export default {
  name: "OrderDetail",
  data: function(){
    return {
      navBarTitle:'订单详情'
    }
  },
  components: {
    [MTNavBar.name]: MTNavBar
  }
}
</script>
