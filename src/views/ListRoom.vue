<template>
    <div class="listRoomWrap">
        <!-- <searchInListRoom/>
        <roomList/> -->
        <roomMap/>
    </div>
    
</template>

<script>
// import searchInListRoom from "@/components/searchInListRoom.vue"
// import roomList from "@/components/roomList.vue"
import roomMap from "@/components/roomMap.vue"
export default {
  components:{
    // searchInListRoom, roomList, 
    roomMap
  },
 
}
</script>

<style scoped src="@/static/css/listRoom.css">
</style>
<style scoped>
  .listRoomWrap {
  padding-top:60px;
  height:100vh;
}
</style>