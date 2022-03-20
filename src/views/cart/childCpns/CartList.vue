<template>
  <div class="cartList">
    <Scroll class="content" ref="Scroll">
      <CartListItem v-for="(item,index) in cartList"
                    :key="index"
                    :itemInfo="item"
                    >{{item}}</CartListItem>
    </Scroll>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childCpns/CartListItem";
import CartBottomBar from "@/views/cart/childCpns/CartBottomBar";
import {mapGetters} from "vuex";
export default {
  name: "CartList",
  components:{
    CartListItem,
    CartBottomBar,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.Scroll.refresh()
  }
}
</script>

<style scoped>
  .cartList{
    height: calc(100% - 49px - 44px - 38px);
  }
  .content{
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
    color: #333333;
  }
</style>