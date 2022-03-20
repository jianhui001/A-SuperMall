<template>
  <div>
    <nav-bar class="detail-bar">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             :key="index"
             class="titleItem"
             :class="{active: index==currentIndex}"
             @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data() {
    return{
      titles:["商品","参数","评论","推荐"],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-weight: normal;
}
.titleItem{
  flex: 1;
  font-size: 13px;
}
img{
  width: 18px;
  margin-top: 12px;
}
.active{
  color: var(--color-high-text);
}
</style>