<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

export default {
  name: "Scroll",
  data(){
    return{
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
    probeType:this.probeType,
    pullUpLoad: this.pullUpLoad,

    click:true,
    mouseWheel:true,
    observeDOM: true,
    observeImage: true
    })

    //2.监听滚动的位置
    if(this.probeType === 2|| this.probeType === 3){
      this.scroll.on('scroll',position=>{
        this.$emit("scroll",position);
      })
    }

    //3.监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit("pullingUp")
      })
    }

  },
  methods:{
    //time=300 默认时间为500
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('-------');//删掉
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
