<template>
  <div class="cart">
  <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

  <!--商品的汇总-->
    <cart-list />

  <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";

import {mapGetters} from 'vuex';
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

export default {
  name: "Cart",
  components:{
    CartBottomBar,
    NavBar,
    Scroll,
    CartList,
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  }
}
</script>

<style scoped>
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    /*font-weight: 700; 加粗*/

  }
  .cart {
    height: 100vh;
  }
</style>
