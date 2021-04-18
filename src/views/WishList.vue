<template>
  <div id="wish-list-wrap">
    <div id="wish-list">
      <div id="title">
        <img src="wish_on.png" width="20">찜한 방
      </div>
      <div v-if="this.wishList.length>0">
        <roomList :roomList="wishList" @deleteWish="changeWishList"/>
      </div>
      <div id="non-wish-list" v-else>
        찜한 방이 없습니다.<br>
        지도에서 방을 찾아보세요 :-)<br><br>
        <b-button size="sm" variant="outline-secondary" @click="goSearch">찾아보기</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import roomList from "@/components/Room/roomList.vue"
export default {
  components: {
    roomList
  },
  data() {
    return {
      userId:this.$store.state.Login.userId,
      wishList:[]
    }
  },
  methods: {
    getWishList() {
      const params=new URLSearchParams({
      id:this.userId,
      });
      const config= {
        headers: {
          Authorization : "Bearer "+this.$store.state.Login.accessToken
        },
        params: params
      };
      axios.get(process.env.VUE_APP_AXIOS_URL+'/wishList', config
      ).then((res) => {
        if(res.data!=null) {
          this.wishList=res.data;
        }else{
          this.$store.dispatch("Login/LOGOUTCLICK")
        } 
      }).catch(( err ) => {
        console.log( err );
        throw err;
      })             
    },
    changeWishList() {
      this.$router.go(this.$router.currentRoute);
    },
    goSearch() {
      this.$router.push('/searchRoom');
    }
  },
  created() {
    this.getWishList();
  },
  watch: {
    wishList: (oldList, newList) =>{
      if(oldList.length>3 && newList.length<=3) {
        document.getElementById( 'wish-list' ).setAttribute( 'id', 'wish-list2' )
      }else if(oldList.length<=3 && newList.length>3) {
        document.getElementById( 'wish-list2' ).setAttribute( 'id', 'wish-list' )
      }
    }
  }
}
</script>
<style scoped src="@/static/css/wishList.css">
</style>
<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: visible;
  }

  #list-room-div {
    height: auto !important;
    overflow: hidden !important;
  }

  .col-sm-10 {
    padding-right: 0 !important;
  }

  @media (min-width: 640px) {
    #list-room-div {
      height:240px !important;
    }
  }

  @media (max-width: 639px) {
    #list-room-content {
      height:auto !important;
      overflow:hidden;
    }
    #room-tag {
      height:auto;
      overflow:hidden;
    }
    #list-room-images, #carouselDiv, .carousel-item {
      width:100% !important;
      height:250px !important;
    
    }
    #wish-button {
      top:280px !important;
    }
    #wish-button {
      top:280px !important;
    }
  }
</style>