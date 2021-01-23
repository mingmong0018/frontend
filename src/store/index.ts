import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken:null,
  },
  mutations: {
    LOGIN(state,{accessToken}){
      state.accessToken=accessToken
    },
    LOGOUT(state){
      state.accessToken=null
    }
  },
  actions: {
    
  },
  modules: {
  }
})
