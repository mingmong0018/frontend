<template>
    <div class="list-room-wrap">
      
      <div id="roomList">
      <!-- 리스트 부분만 감싸는 div -->
        <div v-for="room in rooms" :key="room.room_id">
          <div id="list-room-div">
          <!-- 리스트 하나만 감싸는 div -->
            <div id="list-room-images">
              <div id="carouselDiv">
                <b-carousel
                  id="carousel-no-animation"
                  style="text-shadow: 0px 0px 2px #000"
                  controls
                >
                  <div v-for="image in room.room_images.split(',')" :key="image.index">
                    <b-carousel-slide
                      :img-src="imageUrl+image">
                    </b-carousel-slide>
                  </div>
                </b-carousel>
              </div>
            </div>
            <div id="list-room-content">
              {{room.room_title}}<br>
              {{room.room_deposit}} / {{room.room_rent}}
            </div>
          </div>
        </div>
      </div>
      <roomMap :roomAddr="roomAddr"/>
      
    </div>
    
</template>

<script>
import store from "../store"
import axios from'axios'
import roomMap from "@/components/roomMap.vue"
export default {
  components:{
    roomMap
  },
  data() {
    return {
      rooms:[],
      imageUrl: "room/",
      roomAddr:[],
    }
  },
  created(){
  
    axios({
      method:'GET',
      url:'/api/listRoom'
    }).then((response)=>{
      this.rooms=response.data;
      for(let i=0; i<this.rooms.length; i++) {
        this.roomAddr.push(this.rooms[i].room_address);
      }
    })
    
  }
}
</script>


<style scoped src="@/static/css/listRoom.css">
</style>
<style scoped>
  .list-room-wrap {
  padding-top:60px;
  height:100vh;
}
</style>