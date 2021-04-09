<template>
  <div id="app">
    <div id="nav">
        <b-navbar type="light" variant="light">
          <router-link to="/"><b-navbar-brand ><img src="@/static/images/shareroom_logo2.png" style="width:80px;"></b-navbar-brand></router-link>
          <b-navbar-nav class="m-auto">
            
          </b-navbar-nav>
          
          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/WishList">찜 목록</router-link></b-nav-item>
            <!-- Navbar dropdowns -->
            <template v-if="userName===null||userName===undefined">
              <button id="loginSection" @click="showModal">로그인</button>
            </template>
            <template v-else>
              <b-nav-item-dropdown :text="userName+'님'" right>
              <b-dropdown-item><router-link to="/UpdateMember">내 정보수정</router-link></b-dropdown-item>
              <b-dropdown-item>
                <div v-if="this.myRoomId!=''" @click="goMyRoom">
                  내가 등록한 방
                </div>
                <div v-else>
                  <router-link to="/RegisterRoom">
                    방 등록하기
                  </router-link>
                </div>
              </b-dropdown-item>
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
  import axios from 'axios'
  import loginModal from '@/components/Login/ModalLogin.vue'
  export default {
    components: {
    loginModal
    },
    data(){
      return{
        loginBoolean:false,
        token: this.$store.state.Login.accessToken,
        myRoomId:'',
      }
    },
    computed:{
      userName(){
        return this.$store.state.Login.userName
      }
      
    },
    mounted() {
      this.getMyRoom();
    },
    methods:{
      showModal(){
        this.$bvModal.show('loginModal')
      },
      logout(){
        this.$gAuth.signOut()
        .then(() => {
          this.$store.dispatch("Login/LOGOUT")
        })
        .catch(error  => {
          // things to do when sign-out fails
        })
        if(this.$route.path=='/') {
          this.$router.go(this.$router.currentRoute);
        }else {
          this.$router.push('/')
        }
        
      },
      getMyRoom() {
        const params=new URLSearchParams({
          id:this.$store.state.Login.userId
        });
        axios({
          url: '/api/myRoom', 
          method: "GET",
          params: params,
          headers:{
            Authorization : "Bearer "+this.$store.state.Login.accessToken
          }
        }).then((res) => {
            this.myRoomId=res.data;
            console.log(typeof this.myRoomId, this.myRoomId);
        })
      },
      goMyRoom() {
        if(this.$router.currentRoute.name!='RoomDetail') {
          this.$router.push({name:'RoomDetail', query:{roomId: String(this.myRoomId)}});
        }else {
          this.$router.replace({name:'RoomDetail', query:{roomId: String(this.myRoomId)}});
          this.$router.go(this.$router.currentRoute);
        }
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
  z-index: 100 !important;
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
<style>
  #app {
    height:100%;
  }
</style>
