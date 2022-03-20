<template>
  <div id="profile">
    <NavBar class="nav-bar"><div slot="center">jianhui的商城</div></NavBar>
    <UserInfo></UserInfo>
    <AccountList :list-data="accountList"></AccountList>
    <ListView :list-data="orderList" class="order-list"></ListView>
    <ListView :list-data="serviceList" class="service-list"></ListView>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import UserInfo from "@/views/profile/childCpns/UserInfo";
import AccountList from "@/views/profile/childCpns/AccountList";
import ListView from "@/views/profile/childCpns/ListView";
export default {
  name: "profile",
  components:{
    NavBar,
    UserInfo,
    AccountList,
    ListView
  },
  data: function (){
    return {
      accountList:[
        {balance:'0.00', unit:'元', accountInfo:'我的余额'},
        {balance:0, unit:'个', accountInfo:'我的优惠'},
        {balance:0, unit:'分', accountInfo:'我的积分'}
      ],
      orderList:[
        {imgUrl: require('@/assets/img/profile/message.svg'), info: '我的消息'},
        {imgUrl: require('@/assets/img/profile/shopping.svg'), info: '积分商城'},
        {imgUrl: require('@/assets/img/profile/vip.svg'), info: '会员卡'},
      ],
      serviceList: [
        {imgUrl: require('@/assets/img/profile/cart.svg'), info: '我的购物车'},
        {imgUrl: require('@/assets/img/profile/pointer.svg'), info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.order-list, .service-list {
  margin-top: 8px;
}
</style>
