import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import GAuth from 'vue-google-oauth2'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

// axios.defaults.baseURL = 'http://54.180.154.3:8070';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers['Access-Control-Allow-Credentials']=true;


Vue.use(GAuth, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, 
scope: 'profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/plus.login',
prompt: 'consent'
})
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App) 


}).$mount('#app')
