<template>
  <div id="shopItem">
    <div class="itemSelector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="itemImg">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="itemInfo">
      <div class="itemTitle">{{itemInfo.title}}</div>
      <div class="itemDesc">{{itemInfo.desc}}</div>
      <div class="infoBottom">
        <div class="itemPrice left">￥{{itemInfo.price}}</div>
        <div class="itemCount right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props:{
    itemInfo:{
      type:Object,
      default(){}
    }
  },
  components:{
    CheckButton
  },
  methods:{
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  #shopItem{
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    font-size: 0;
  }
  .itemSelector{
    width: 20px;
    display: flex;
    /*水平垂直居中*/
    justify-content: center;
    align-items: center;
  }
  .itemImg{
    padding: 5px;
  }
  .itemImg img{
    width: 80px;
    /*height: 124px;*/
    display: block;
    border-radius: 5px;
  }
  .itemInfo{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .itemTitle, .itemDesc{
      overflow: hidden;
      /*所有的文本都显示在这一行*/
      white-space: nowrap;
      /*多余的文本用省略号显示*/
      text-overflow: ellipsis;
   }
  .itemInfo .itemDesc {
    font-size: 14px;
    color: #666;
    margin-top: 30px;
  }
  .infoBottom{
    display: flex;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .infoBottom .itemPrice {
    color: orangered;
  }
  .infoBottom .itemCount{
    position: absolute;
    right: -10px;
  }
</style>