import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { nextTick } from 'vue/types/umd'
import Home from '../views/Home.vue'
import ListRoom from '../views/ListRoom.vue'
import Notice from '../views/Notice.vue'
Vue.use(VueRouter)



const routes: Array<RouteConfig> = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ListRoom',
    name: 'ListRoom',
    component: ListRoom
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
