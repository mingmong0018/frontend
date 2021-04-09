import {Module} from 'vuex';
import {RootState} from'@/store/index';
interface Login{
  accessToken: null;
  userName: null;
  userId: null;
  index: 0;
  recentKeyword: [{keywordId: number ;keywordContent: null }];
}
const module: Module<Login,RootState>={
  namespaced : true,
    state: {
        accessToken : null,
        userName : null,
        userId : null,
        index : 0,
        recentKeyword : [{keywordId:0,keywordContent:null}],
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
          },
          ADDKEYWORD(state,{keyword}){
            for(let i=0;i<state.recentKeyword.length;i++){
              if(state.recentKeyword[i].keywordContent===keyword){
                state.recentKeyword.splice(i,1);
              }
                
              
            }
            state.recentKeyword.push({keywordId:++state.index,keywordContent:keyword})
            console.log(state.recentKeyword)
            
          },
          DELETEKEYWORD(state,{keywordIndex}){
            state.recentKeyword.splice(state.recentKeyword.length-keywordIndex-1,1)
            
          },
          DELETEALLKEYWORD(state){
            state.recentKeyword.splice(0,state.recentKeyword.length)
            
          },
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
        },
        ADDKEYWORD({commit},{keyword}){
          commit('ADDKEYWORD',{keyword})
        },
        DELETEKEYWORD({commit},{keywordIndex}){
          commit('DELETEKEYWORD',{keywordIndex})
        },
        DELETEALLKEYWORD({commit}){
          commit('DELETEALLKEYWORD')
        },
    },
    getters:{
      GETALLKEYWORD: state=>{
        if(state.recentKeyword[0].keywordContent==null){
           state.recentKeyword.splice(0,1);
        }
        return state.recentKeyword;
      }
    }
}
export default module;