<template>
  <div id="wish-list-wrap">
    <div id="title">
      <img src="wish_on.png" width="20">찜한 방
    </div>
    <roomList :roomList="wishList"/>
  </div>
</template>

<script>
import axios from 'axios'
import roomList from "@/components/roomList.vue"
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
  created() {
    const params=new URLSearchParams({
      id:this.userId,
    });
    axios({
      url: '/api/wishList', 
      method: "GET",
      params: params,
      headers:{
      Authorization : "Bearer "+this.$store.state.Login.accessToken
      }
    }).then((res) => {
      if(res.data!='') {
        this.wishList=res.data;
      }else{
        this.$store.dispatch("Login/LOGOUTCLICK")
      } 
    }).catch(( err ) => {
      console.log( err );
      throw err;
    })             
  }
}
</script>
<style scoped src="@/static/css/wishList.css">
</style>
<style scoped>
 #wish-list-wrap {
    overflow:hidden;
  }

  #roomList {
    position: relative;
    height:100%;
    width:100%;
    display:block;
    margin:0 auto;
    float:none !important
  }

  #title {
    position:absolute;
    z-index: 1;
    width:100%;
    height:65px;
    padding:0 20px;
    font-size:1.5em;
    font-weight:600;
    line-height: 80px;
    background:white;
  }

  #title img {
     margin-bottom:7px; 
     margin-right:10px;
  }
  
  @media (min-width: 1040px) {
      #wish-list-wrap, #roomList, #title {
          width:940px;
      }
      #list-room-content {
        width: 100% !important;
      }
  }
</style>
<style>

  #list-room-div {
    height: auto !important;
    overflow: hidden !important;
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
  }
</style>