<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
        <img class="privateImage-svg left" src="@/assets/img/profile/avatar.svg" alt="">
      <div class="login-info left">
          <div class="login">登录/注册</div>
        <div class="phone">
          <div>
            <img class="icon-mobile" src="@/assets/img/profile/phone.svg" alt="">
          </div>
          <div class="user-phone">暂无绑定手机号</div>
        </div>
      </div>
      <img class="arrow-svg right" src="@/assets/img/common/arrow-left.svg" alt="">
    </a>
  </div>
</template>

<script>
export default {
name: "UserInfo"
}
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}
.privateImage-svg {
  width: 64px;
  /*height: 60px;*/
  /*background-color: #fff;*/
  border-radius: 30px;
}

 .arrow-svg {
  width: 22px;
  /*height: 22px;*/
  margin-top: 18px;
}

 .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}
.login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}
.login,.user-phone{
  width: 100px;
}
.user-phone{
  position: absolute;
  left: -2px;
}
.login-info .phone .icon-mobile {
  position: absolute;
  width: 16px;
  /*height: 18px;*/
  left: -18px;
  top: 0px;
}
</style>

