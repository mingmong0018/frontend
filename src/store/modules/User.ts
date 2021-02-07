import {Module} from 'vuex';
import {RootState} from'@/store/index';
import axios from 'axios';
interface User{
  user: {

  };
}
const module: Module<User,RootState>={
  namespaced : true,
    state: {
        user: {
            
          }
    },
    mutations:{
       
            
        
    },
    actions:{
       
    },
    getters:{
       
    }
}
export default module;