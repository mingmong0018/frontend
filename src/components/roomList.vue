<template>
    <div id="roomList">
    <div id="roomList-title">
        <span v-if="roomList.length>0">{{roomList.length}} 개의 방이 룸메이트를 기다리고 있어요!</span>
        <span style="font-size:0.8em;" v-else> 검색 결과가 없어요:) 지도를 축소하여 더 넓은 지역을 확인하거나, 다른 키워드로 검색해주세요!</span>
    </div>
    <div v-for="(room, index) in roomList" :key="index">
        <!-- 리스트 하나만 감싸는 div -->
        <div id="list-room-div">
            <div id="list-room-images">
                <div id="carouselDiv">
                    <b-carousel
                    id="carousel-no-animation"
                    style="text-shadow: 0px 0px 2px #000"
                    indicators
                    controls
                    >
                    <div v-for="image in room.room_images.split(', ')" :key="image.index">
                        <b-carousel-slide
                        :img-src="imageUrl+image">
                        </b-carousel-slide>
                    </div>
                    </b-carousel>
                </div>
            </div>
            <div id="list-room-content">
                <span class="room-region">
                    {{room.room_address.split(' ')[0]+' '+room.room_address.split(' ')[1]+' '+room.room_address.split(' ')[2]}}
                </span><br>
                <span class="room-title">{{room.room_title}}</span><br>
                {{room.room_deposit}} / {{room.room_rent}}
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        roomList: Array,
    },
    data() {
        return {
            imageUrl: "room/",
        }
    }
}
</script>

<style scoped src="@/static/css/listRoom.css">
</style>
<style>
    .carousel-indicators li {
        width:7px !important;
        height:7px !important;
        border-radius: 3px !important;
        border-top: none !important;
        border-bottom: none !important;
    }

    .carousel, .carousel-inner, .carousel-item {
        height:100%;
    }

</style>