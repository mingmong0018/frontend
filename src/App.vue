<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar type="light" variant="light">
          <router-link to="/"><b-navbar-brand ><img src="@/static/images/shareroom_logo2.png" style="width:60px;"></b-navbar-brand></router-link>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">찜 목록</b-nav-item>
            <b-nav-item href="#">알림<b-badge pill>+99</b-badge></b-nav-item>

            <!-- Navbar dropdowns -->
            <template v-if="id===null">
              <b-nav-item v-b-modal.loginModal>로그인</b-nav-item>
            </template>
            <template v-else>
              <b-nav-item-dropdown text="누구누구님" right>
              <b-dropdown-item href="#">내 정보수정</b-dropdown-item>
              <b-dropdown-item href="#">로그아웃</b-dropdown-item>
            </b-nav-item-dropdown>
            </template>
            
            
            
          </b-navbar-nav>
        </b-navbar>
      </div>
    </div>
    <router-view/>
    <loginModal/>
  </div>
</template>
<script lang="ts">
  import loginModal from '@/components/ModalLogin.vue'
  export default {
    components: {
    loginModal
    },
    data(){
      return{
        id:null
      }
    }
  }
</script>
<style scoped>
  #nav{
    top:0px;
    width:100vw;
    position:fixed;
  }
</style>
