<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default() {
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
/* 一行显示两个goodsItem */
.goods{
  display: flex;
  /*包裹*/
  flex-wrap: wrap;
  /*均等分*/
  justify-content: space-around;

  padding: 2px;
}
</style>
