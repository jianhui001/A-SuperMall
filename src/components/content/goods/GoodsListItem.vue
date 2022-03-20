<template>
  <div class="goods-item" @click="itemClick">
<!--    <img :src="showImage" alt=""-->
<!--         @load="imageLoad">-->
    <img v-lazy="showImage" alt=""
          @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('./detail/'+this.goodsItem.iid)
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.img || this.goodsItem.image ||this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
  .goods-item{
    position: relative;
    padding-bottom: 40px;
    /*一行两个*/
    width: 48%;
  }
  .goods-item img{
    width: 100%;
  }
  .goods-info{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    /* p包含无法在框中容纳的长文本,文本被修剪了。*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-item .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-item .collect{
    position: relative;
  }
  .goods-item .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px
  }
</style>
