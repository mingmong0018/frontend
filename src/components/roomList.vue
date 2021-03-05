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
                    <div v-for="image in room.room_images.split(',')" :key="image.index">
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
                <span class="room-title" @click="goRoomDetail(room.room_id)" title="방 상세정보 보기">{{room.room_title}}</span><br>
                보증금 {{room.room_deposit}} / 월세 {{room.room_rent}}
                <hashTag :roomId="room.room_id"/>
                <div style="width:100px; height:10px;"></div>
                <span class="mem-age" v-if="room.mem_age>=60"><span v-html="space"></span>60대<span v-html="space"></span></span>
                <span class="mem-age" v-else-if="room.mem_age>=50"><span v-html="space"></span>50대<span v-html="space"></span></span>
                <span class="mem-age" v-else-if="room.mem_age>=40"><span v-html="space"></span>40대<span v-html="space"></span></span>
                <span class="mem-age" v-else-if="room.mem_age>=30"><span v-html="space"></span>30대<span v-html="space"></span></span>
                <span class="mem-age" v-else-if="room.mem_age>=20"><span v-html="space"></span>20대<span v-html="space"></span></span>
                
                <span class="mem-confirm" v-if="room.mem_confirm=='y'">
                    <span v-html="space"></span><span v-html="check"></span>
                    인증회원
                    <span v-html="space"></span>
                </span>
                <br>
                <span class="mem-gender f" v-if="room.mem_gender=='f'"><span v-html="space"></span>여성 호스트<span v-html="space"></span></span>
                <span class="mem-gender m" v-else-if="room.mem_gender=='m'"><span v-html="space"></span>남성 호스트<span v-html="space"></span></span>
            </div>
            
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import hashTag from "@/components/hashTag"
export default {
    components: {
        hashTag
    },
    props: {
        roomList: Array,
    },
    data() {
        return {
            imageUrl: "room/",
            wish:false,
            space:'&nbsp;',
            check:'&#10003;',
        }
    },
    methods: {
        goRoomDetail(roomId) {
            this.$router.push({name: 'RoomDetail', query: {roomId: roomId}});
        },
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