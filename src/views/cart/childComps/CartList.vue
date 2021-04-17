<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :item-info="item"
        :key="index"/>

    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
    console.log('刷新cart')
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 49px  - 40px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
