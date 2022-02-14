<template>
  <div class="checkButton" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.checkButton{
  border-radius: 50%;
  border: 1px solid #aaa;
  width: 18px;
  height: 18px;
}
.check{
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>