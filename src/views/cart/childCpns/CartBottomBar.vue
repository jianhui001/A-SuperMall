<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :is-checked="isSelectAll"
                   @click.native="checkClick"
                   class="check-button"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算 ({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(["cartList"]),
    totalPrice(){
      return '￥'+this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        //reduce 为数组中的每一个元素依次执行回调函数
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter((item) => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length===0) return false
      //1.使用filter
      // 数字取反为false,0取反为true
      // return !(this.cartList.filter(item=>!item.checked).length)

      //2.使用find
      return !this.cartList.find(item => !item.checked)

      //3.普通遍历
      //   for(let item of this.cartList){
      //     if(!item.checked){
      //       return false
      //     }
      //   }
      //   return true
      // }
    }
  },
  methods: {
    checkClick(){//全部选中
      if(this.isSelectAll){
        this.cartList.forEach(item => {
          item.checked = false
        })
      }else{//部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(this.checkLength==0){
        this.$toast.show('请选择购买的商品',1000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    color: black;
    font-size: 16px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 80px;
    color: #fff;
    background-color: #ff5777;
    text-align: center;
    flex: 1;
  }

</style>