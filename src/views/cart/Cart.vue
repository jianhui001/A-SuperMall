<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <CartList></CartList>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childCpns/CartList";

import Scroll from "@/components/common/scroll/Scroll";
import {mapGetters} from 'vuex'
export default {
  name: "cart",
  components:{
    NavBar,
    CartList,
    Scroll
  },
  computed:{
    //两种语法
    //1.
    // ...mapGetters(['cartLength','cartList']),

    //2.
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
  .cart{
    background-color: var(--color-tint);
    color: #fff;
    height: 100vh;
  }
</style>
