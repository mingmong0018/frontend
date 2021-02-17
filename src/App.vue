<template>
  <div id="app">
    <div id="nav">
        <b-navbar type="light" variant="light">
          <router-link to="/"><b-navbar-brand ><img src="@/static/images/shareroom_logo2.png" style="width:80px;"></b-navbar-brand></router-link>
          <b-navbar-nav class="m-auto">
            
          </b-navbar-nav>
          
          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/WishList">찜 목록</router-link></b-nav-item>
            <b-nav-item><router-link to="/Notice">알림<b-badge pill>+99</b-badge></router-link></b-nav-item>
            <!-- Navbar dropdowns -->
            <template v-if="userName==='null'||userName===undefined">
              <button id="loginSection" @click="showModal">로그인</button>
            </template>
            <template v-else>
              <b-nav-item-dropdown :text="userName+'님'" right>
              <b-dropdown-item><router-link to="/UpdateMember">내 정보수정</router-link></b-dropdown-item>
              <b-dropdown-item id="logout" @click="logout">로그아웃</b-dropdown-item>
            </b-nav-item-dropdown>
            </template>
            
            
            
          </b-navbar-nav>
        </b-navbar>
    </div>
    <router-view/>
    <loginModal/>
  </div>
</template>
<script>

  import loginModal from '@/components/ModalLogin.vue'
  export default {
    components: {
    loginModal
    },
    data(){
      return{
        userName:localStorage.userName,
        loginBoolean:false
      }
    },
    // computed:{
    //   getUserName(){
    //     return this.$store.getters("Login/getUserName")
    //   }
      
    // },
    methods:{
      showModal(){
        this.$bvModal.show('loginModal')

      },
      logout(){
        this.$gAuth.signOut()
        .then(() => {
          this.$store.dispatch("Login/LOGOUT")
          this.$router.go();
        })
        .catch(error  => {
          // things to do when sign-out fails
        })
      
        this.$router.push('/')
        
      }
      
    }
  }
</script>
<style scoped>
#loginSection{
  border:0; 
  background:#F8F9FA; 
  outline:0;
  color:#7C7C7D;
}
#nav{
  z-index: 1 !important;
  top:0px;
  width:100vw;
  position:fixed;
  display: block;
}
 a:link { color: #7C7C7D; text-decoration: none;}
 a:visited { color: #7C7C7D; text-decoration: none;}
 a:hover { color: #7C7C7D; text-decoration: none;}

.container {
  padding-top:60px;
}
</style>
