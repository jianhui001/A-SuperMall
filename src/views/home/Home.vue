<template>
  <div id="home">
<!--购物车导航-->
    <nav-bar class="home-nav">
      <template #center>
        <div class="center">购物街</div>
      </template>
    </nav-bar>

   <scroll class="content"
           ref="scroll"
           :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore">
     <home-swiper :banners="banners"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control :titles="['流行','新款','精选']"
                  class="tab-control"
                  @tabClick="tabClick"
                  ref="tabControl"
     ></tab-control>
     <goods-list :goods="goods[currentType].list"></goods-list>
   </scroll>

    //vue2 click事件作用于组件内部，如果组件内没有写click事件，便会无响应
    //加上.native即可解决
    <back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childCpns/HomeSwiper";
import RecommendView from "./childCpns/RecommendView";
import FeatureView from "./childCpns/FeatureView";

import NavBar from "@/components/common/navbar/NavBar"
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop"

import {getHomeMultidata,getHomeGoods} from "@/network/home"
import {debounce} from "@/common/utils";

export default {
  name: "home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffSetTop:0
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //1.监听滚动
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })

    //2.决定tabControl是否吸顶
    //$el可以获取组件内部的东西
  },
  methods:{
    // 事件监听相关的方法

    tabClick(index){
    //  1.
    //   switch (index){
    //     case 0:
    //       this.currentType = 'pop';
    //       break;
    //     case 1:
    //       this.currentType = 'new'
    //       break;
    //     case 2:
    //       this.currentType = 'sell'
    //       break;
    //   }

    //2.
    // this.currentType = (index < 1) ? 'pop' : (index == 1) ? 'new' : 'sell';

    //3.
    //  Object.keys会返回一个由给定对象的自身可枚举属性组成的数组
    this.currentType = Object.keys(this.goods)[index]
    },
    backClick(){
      console.log("BACKTOP");
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.isShowBackTop=(-position.y)>1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },



    // 网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        // this.goods[type].list = this.goods[type].list.concat(...res.data.list)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page+=1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
    padding-bottom: 1000px;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    /*兼容性不好*/
    /*position: sticky;*/
    right: 0;
    left: 0;
    top: 0;
    z-index: 9;
  }

  /*.content{*/
  /*  position: absolute;*/
  /*  top:44px;*/
  /*  bottom: 49px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/

  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    /*margin-top: 44px;*/
  }
</style>
