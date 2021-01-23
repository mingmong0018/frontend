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
      localStorage.accessToken=accessToken
    },
    LOGOUT(state){
      state.accessToken=null
    }
  },
  actions: {
    LOGIN({commit},{accessToken}){
      commit('LOGIN',accessToken)
    },
    LOGOUT({commit}){
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
