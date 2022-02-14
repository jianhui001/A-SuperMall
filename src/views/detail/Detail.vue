<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods-info="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imgLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"  />
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"  />
      <GoodsList ref="recommend" :goods="recommends"  />
    </Scroll>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childCpms/DetailNavBar";
import DetailSwiper from "@/views/detail/childCpms/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childCpms/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childCpms/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childCpms/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childCpms/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childCpms/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childCpms/DetailBottomBar";
import Scroll from "@/components/common/scroll/Scroll";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail"

import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import {BACK_POSITION} from "@/common/const";

import {mapActions} from 'vuex'
export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },
  data(){
    return{
      iid: null,
      topImages: [], // 轮播图
      goods: {}, // 商品基本信息
      shop: {}, // 店铺
      detailInfo: {},
      paramInfo: {}, // 参数
      commentInfo: {}, // 评论
      recommends: [], // 推荐
      themeTopYs: [], // 标题内容对应的y值
      getThemeTopY: null, // 防抖
      currentIndex: 0
    }
  },
  //执行顺序与引入（import）顺序无关，而与注册顺序（mixins: [myMixin1，myMixin2] ）有关，先注册的先执行
  mixins:[backTopMixin,itemListenerMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{

      //1.获取顶部的轮播图数据
      const data = res.data.result
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.获取用户评价
      if(data.rate.list){
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求商品推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.data.list
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []; //先清空，不然不止4个值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE)//JS中number最大值
    }, 100);
  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y;

      //2.positionY和主题中值进行对比
      let length = this.themeTopYs.length
      //(1.
      // for(let i = 0; i<length;i++){
      //   if(
      //       this.currentIndex!=i &&
      //       ((i<length-1&&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY <  this.themeTopYs[i+1])||
      //       (i === length-1 && positionY >= this.themeTopYs[i]))
      //   ){
      //     this.currentIndex=i
      //     console.log(i);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      //(2.hack 做法,引入一个值与最后一个值比较
      for(let i = 0; i<length-1; i++){
        if(this.currentIndex!=i &&(positionY>=this.themeTopYs[i]) && positionY<this.themeTopYs[i+1]){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //3.是否显示回到顶部
      this.isShowBackTop=positionY > BACK_POSITION
    },
     addToCart(){
      //1.获取购物车需要展示的信息
       const product ={}
       product.image = this.topImages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.realPrice
       product.iid = this.iid

       //2.将商品添加到购物车里
       //使用dispatch
       // this.$store.commit('addCart',product)
       // this.$store.dispatch('addCart',product).then(res=>{
       //   console.log(res);
       // })
       //使用mapActions映射
       this.addCart(product).then(res=>{
         console.log(res);
         // this.message=res
         // this.show=true
         //
         // setTimeout(()=>{
         //   this.show = false
         //   this.message = ''
         // },1000)
         this.$toast.show(res)
       })
     }
  }
}
</script>

<style scoped>
  #detail{
    /*隐藏main-tab-bar*/
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .content{
    height: calc(100% - 44px );
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>