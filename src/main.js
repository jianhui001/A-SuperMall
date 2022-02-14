import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import Toast from "@/components/common/toast";

Vue.config.productionTip = false
//初始化EventBus事件总线
Vue.prototype.$bus  = new Vue()
//安装Toast插件,会执行toast中index.js文件的install函数
Vue.use(Toast)
//使用懒加载插件
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
