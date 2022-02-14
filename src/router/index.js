import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
Vue.use(Router)

const routes = [
  {
    path:'',
    meta:{footShow:true},
    redirect:'/home'
  },
  {
    path:'/home',
    meta:{footShow:true},
    component:Home
  },
  {
    path: '/category',
    meta:{footShow:true},
    component: Category
  },
  {
    path: '/cart',
    meta:{footShow:true},
    component: Cart
  },
  {
    path: '/profile',
    meta:{footShow:true},
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new Router({
  routes,
  mode:'history'
})

export default router
