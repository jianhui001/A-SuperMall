<template>
  <h2>目录</h2>
</template>

<script>


export default {
  name: "category",
  //created钩子函数里面dom没有开始加载，拿不到dom元素，要在mounted里面拿dom
  //最先拿到data和methods的是created
  //最先操作真实dom的是在mounted
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
  //   this.scroll = new BScroll('.wrapper',{
  //     probeType:3,
  //     pullUpLoad:true
  //   })
  //
  //   // this.scroll.on('scroll',position=>{
  //   //   console.log(position);
  //   // })
  //   //
  //   this.scroll.on('pullingUp',()=>{
  //     console.log('上拉加载更多');
  //     this.scroll.finishPullUp();
  //   })
  //
  }
}
</script>

<style scoped>


</style>
