<template>
    <div class="list-room-wrap">
        <roomList/>
        <roomMap/>
    </div>
    
</template>

<script>
import roomList from "@/components/roomList.vue"
import roomMap from "@/components/roomMap.vue"
export default {
  components:{
    roomList, 
    roomMap
  },
 
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