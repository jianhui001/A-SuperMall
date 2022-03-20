<template>
  <div id="list">
    <div v-for="(item,index) in listData" :key="index" class="item">
      <div class="number">
        <span class="balance">{{ item.balance }}</span>{{item.unit}}
      </div>
      <div class="account-info">{{item.accountInfo}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountList",
  props:{
    listData:{
      type: Array,
      default: function (){
        return []
      }
    }
  },
  filters: {
    numFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  }
}
</script>

<style scoped>
#list{
  display: flex;
}
.item{
  flex: 1;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;

  color: #666;
  font-size: 13px;
  padding: 18px;
}
.item:last-of-type{
  margin-right: 0;
}
.item .number .balance{
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info{
  margin-top: 6px;
}
</style>