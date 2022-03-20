<template>
  <div id="category">
    <NavBar class="nav-bar"><div slot="center">商品分类</div></NavBar>
    <div class="content">
      <TabMenu :categories="categories" @selectItem="selectItem"></TabMenu>
      <Scroll class="tab-content" :probe-type="3">
        <TabContentCategory :subcategories="showSubcategory"/>
        <TabControl :titles="['综合', '新品', '销量']"
                     @tabClick="tabClick"/>
        <GoodsList :goods="showCategoryDetail"></GoodsList>
      </Scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabMenu from "@/views/category/childCmps/TabMenu";
import TabContentCategory from "@/views/category/childCmps/TabContentCategory";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import {getCategory,getSubcategory,getCategoryDetail} from "@/network/category"
import {tabControlMixin} from "@/common/mixin"
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "category",
  //created钩子函数里面dom没有开始加载，拿不到dom元素，要在mounted里面拿dom
  //最先拿到data和methods的是created
  //最先操作真实dom的是在mounted
  data(){
    return{
      categories: [],
      categoryData: {},
      currentIndex:-1
    }
  },
  mixins:[tabControlMixin],
  components:{
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    //请求分类数据
    this._getCategory()
  },
  computed:{
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType].data
    }
  },
  methods:{
    _getCategory(){
      getCategory().then(res=>{
        // console.log(res);
        // 1.获取分类数据
        this.categories=res.data.data.category.list
        // 2.初始化每个类别的子数据
        for(let i = 0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    //获得第一个分类的子目录
    _getSubcategories(index){
      this.currentIndex = index;
      const maitkey = this.categories[index].maitKey
      getSubcategory(maitkey).then(res =>{
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail("pop")
        this._getCategoryDetail("sell")
        this._getCategoryDetail("new")
      })
    },
    //获得第一个分类的子目录的 流行\新款\精选的数据
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey,type).then(res =>{
        // 3.将获取的数据保存下来
        // console.log(res);
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    //事件响应相关的方法
    selectItem(index){
      this._getSubcategories(index)
    }
  }
}
</script>

<style scoped>
#category{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: normal;
}

.content{
  height: calc(100% - 44px - 49px);
  display: flex;
  overflow: hidden;
}

.tab-content{
  height: 100%;
  flex: 1;
}
</style>
