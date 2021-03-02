import Vue from 'vue'
import Vuex,{StoreOptions} from 'vuex'
import Login from './modules/Login';
import User from './modules/User';
import EmailAuth from './modules/EmailAuth';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export interface RootState
{
  accessToken: null;
  userName: null;
  userId: null;
}

const store: StoreOptions<RootState>={
  plugins: [createPersistedState()],
  modules:{
    Login,
    User,
    EmailAuth,
  }
}
export default new Vuex.Store(store)
