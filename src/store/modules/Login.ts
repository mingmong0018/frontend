import {Module} from 'vuex';
import {RootState} from'@/store/index';
interface Login{
  accessToken: null;
  userName: null;
  userId: null;
}
const module: Module<Login,RootState>={
  namespaced : true,
    state: {
        accessToken : null,
        userName : null,
        userId : null,
    },
    mutations:{
        LOGIN(state,{accessToken,userName,userId}){
            state.accessToken=accessToken
            localStorage.accessToken=accessToken 
            state.userName=userName
            localStorage.userName=userName
            state.userId=userId
            localStorage.userId=userId
      
          },
          LOGOUT(state){
            state.accessToken=null
            localStorage.accessToken=null
            state.userName=null
            localStorage.userName=null
            state.userId=null
            localStorage.userId=null
            
          },
          LOGOUTCLICK(state){
            alert("토큰이 잘못됐습니다.\n로그인을 다시 시도해 주세요.")
            document.getElementById("logout")?.click()
          }
    },
    actions:{
        LOGIN({commit},{accessToken,userName,userId}){
            commit('LOGIN',{accessToken,userName,userId})
        },
        LOGOUT({commit}){
            commit('LOGOUT')
        },
        LOGOUTCLICK({commit}){
          commit('LOGOUTCLICK')
        }
    }
}
export default module;