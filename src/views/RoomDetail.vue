<template>
    <div class="room-detail-wrap">
        <div id="room-detail">
            <div id="room-images">
                <div id="carouselDiv">
                    <b-carousel
                    id="carousel-no-animation"
                    style="text-shadow: 0px 0px 2px #000"
                    indicators
                    controls
                    :interval="interval"
                    >
                    <div v-for="image in this.roomImg" :key="image.index">
                        <b-carousel-slide
                        :img-src="imageUrl+image">
                        </b-carousel-slide>
                    </div>
                    </b-carousel>
                </div>
            </div>
            <div id="room-content">
                <div id="room-title">
                    {{ room.room_title }}
                </div>
                <div v-if="room.room_deposit>0" id="room-price">
                    <span id="room-deposit">보증금 {{ room.room_deposit }} 만원</span><br>
                    <span id="room-rent">월세 {{ room.room_rent }} 만원</span>
                </div>
                <div v-if="room.room_deposit==0" id="room-price">
                    <span id="room-deposit">보증금 없음</span><br>
                    <span id="room-rent">월세 {{ room.room_rent }} 만원</span>
                </div>
                <div id="room-tag">
                    <span v-for="tag in tags" :key="tag.tag_id">
                        #{{ tag.tag_content }}
                    </span>
                </div>
                <div id="room-region">
                    {{ roomRegion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RoomDetail',
    data() {
        return {
            roomNumber:this.$route.query.roomId,
            room:[],
            tags:[],
            options:[],
            imageUrl: "room/",
            roomImg:[],
            interval:0,
            roomRegion:'',
        }
    },
    mounted() {
        const roomNumber=this.roomNumber;
        function getRoomDetail() {
            return axios.get('/api/roomDetail', {
                params: {
                    roomId: roomNumber
                }
            });
        }

        function getRoomTag() {
            return axios.get('/api/roomTag', {
                params: {
                    roomId: roomNumber
                }
            });
        }
        
        function getRoomOption() {
            return axios.get('/api/roomOption', {
                params: {
                    roomId: roomNumber
                }
            });
        }

        axios.all([getRoomDetail(), getRoomTag(), getRoomOption()])
            .then(axios.spread( (room, tag, option) => {
                this.room=room.data;
                this.tags=tag.data;
                this.options=option.data;
                this.roomImg=this.room.room_images.split(', ');
                this.roomRegion=this.room.room_address.split(' ')[0]+' '+this.room.room_address.split(' ')[1]+' '+this.room.room_address.split(' ')[2];
            })
        );
    }
}
</script>

<style scoped src="@/static/css/roomDetail.css">

</style>

<style>
.carousel-indicators li {
    width:7px !important;
    height:7px !important;
    border-radius: 3px !important;
    border-top: none !important;
    border-bottom: none !important;
}

.carousel img {
    object-fit: cover;
}
</style>