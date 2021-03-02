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
            state.userName=userName
            state.userId=userId
            
          },
          LOGOUT(state){
            state.accessToken=null
            state.userName=null
            state.userId=null
            
            
          },
          LOGOUTCLICK(state){
            if(confirm("토큰이 정상적이지 않습니다. 만료된 토큰이거나 이미 사용된 토큰입니다.")){
              document.getElementById("logout")?.click()
            }
            
            
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
    },
}
export default module;