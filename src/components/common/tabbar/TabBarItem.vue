<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" >
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:"#ff5777"
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed:{
    isActive(){
      // indexOf()返回某个指定的字符串值在字符串中首次出现的位置。  == -1 说明不存在
      return this.$route.path.indexOf(this.path)!== -1
      //这个也行
      // return this.$route.path === this.path
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  }
}
</script>

<style >
/*scoped 只在当前组件生效*/

.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  /* 去掉图片与文字默认的间隔3px */
  vertical-align: middle;
}
</style>
