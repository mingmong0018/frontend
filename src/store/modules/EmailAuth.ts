import {Module} from 'vuex';
import {RootState} from'@/store/index';
interface EmailAuth{
  email: null;
  emailCode: null;
}
const module: Module<EmailAuth,RootState>={
  namespaced : true,
    state: {
        email : null,
        emailCode : null
    },
    mutations:{
       
            
        
    },
    actions:{
       
    },
    getters:{
       
    }
}
export default module;