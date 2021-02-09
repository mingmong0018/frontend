import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import { nextTick } from 'vue/types/umd'
import Home from '../views/Home.vue'
import SearchRoom from '../views/SearchRoom.vue'
import Notice from '../views/Notice.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SearchRoom',
    name: 'SearchRoom',
    props: true,
    component: SearchRoom
  },
  {
    path: '/Notice',
    name: 'Notice',
    component: Notice,
    beforeEnter: (to, from, next) => {
      if (store.state.accessToken !== '') {
        return next();
      }
      // }
      // next(window.open('df'));
    }
  },
  
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
