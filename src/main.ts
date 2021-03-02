import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import GAuth from 'vue-google-oauth2'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(GAuth, {clientId: '166602658975-60bi0mdf8r5h05g8mttklpqtrh5hc6g7.apps.googleusercontent.com', 
scope: 'profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/plus.login'
})
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App) 


}).$mount('#app')
