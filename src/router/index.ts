import store, { RootState } from '@/store/index.ts'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import SearchRoom from '../views/SearchRoom.vue'
import WishList from '../views/WishList.vue'
import Notice from '../views/Notice.vue'
import UpdateMember from '../views/UpdateMember.vue'
import NaverCallback from '@/components/Login/NaverCallback.vue'
import RoomDetail from '../views/RoomDetail.vue'
Vue.use(VueRouter)

const state: any|RootState = store.state
const requireAuth=()=>(to: any,from: any,next: any)=>{
  if ((state.Login.accessToken!==null)&&(state.Login.accessToken!==undefined)) {
    // alert("in:"+state.Login.accessToken)
    return next();
  }else{
    // alert("not:"+state.Login.accessToken)
    return document.getElementById("loginSection")?.click()
  }
}

const routes: Array<RouteConfig> = [
  
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home
  },
  {

    path: '/callback',
    name: 'NaverCallback',
    component: NaverCallback
  },
  {
    path: '/SearchRoom',
    name: 'SearchRoom',
    props: true,
    component: SearchRoom

  },
  {
    path: '/RoomDetail',
    name: 'RoomDetail',
    component: RoomDetail

  },
  {
    path: '/WishList',
    name: 'WishList',
    component: WishList,
    beforeEnter: requireAuth(),
  },
  {
    path: '/Notice',
    name: 'Notice',
    component: Notice,
    beforeEnter:requireAuth(),
  },
  {
    path: '/UpdateMember',
    name: 'UpdateMember',
    component: UpdateMember,
    beforeEnter:requireAuth(),
  }
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

