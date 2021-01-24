<template>
    <div class="list-room-wrap">
        <div v-for="room in rooms" :key="room.room_id">
          <div id="list-room-images">
          </div>
          <div id="list-room-content">
            {{room.room_title}}<br>
            {{room.room_deposit}} / {{room.room_rent}}
          
          </div>
        </div>
        <roomMap/>
    </div>
    
</template>

<script>
import axios from'axios'
import roomMap from "@/components/roomMap.vue"
export default {
  components:{
    roomMap
  },
  data() {
    return {
      rooms:[],
    }
  },
  created(){
        axios({
            method:'GET',
            url:'/api/listRoom'

        }).then((response)=>{
            this.rooms=response.data;
            console.log(this.rooms);
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