<template>
    <div class="room-detail-wrap">
        <div id="room-detail">
            <div id="room-detail-head">
                <div id="room-title">
                    {{ room.room_title }}
                </div>
                <wishbutton :roomId="roomNumber"/>
            </div>
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
                        :img-src="image">
                        </b-carousel-slide>
                    </div>
                    </b-carousel>
                </div>
            </div>
            <div id="room-content">
                <div v-if="room.room_deposit>0" id="room-price">
                    <span id="room-deposit">보증금 {{ room.room_deposit }} 만원</span><br>
                    <span id="room-rent">월세 {{ room.room_rent }} 만원</span>
                </div>
                <div v-if="room.room_deposit==0" id="room-price">
                    <span id="room-deposit">보증금 없음</span><br>
                    <span id="room-rent">월세 {{ room.room_rent }} 만원</span>
                </div>
                <hashTag :roomId="room.room_id" style="margin:0 auto;"/><br>
                <div id="room-region">
                    {{ roomRegion }}
                </div>
                <div class="inner-wrap">
                    <div class="inner-title">
                        방 소개
                    </div>
                    <div class="inner-content" v-html="roomReport">
                    </div>
                </div>
                <div class="inner-wrap">
                    <div class="inner-title">
                        옵션
                    </div>
                    <div class="inner-content">
                        <table id="option">
                            <tr>
                                <td>방옵션</td>
                                <td>
                                    <div class="option-group" v-for="option in options" :key="option.index">
                                        <div class="option-name" v-if="option.option_group=='room'">
                                            <span>{{ option.option_name }}</span>
                                            <span v-html="space"></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>기타옵션</td>
                                <td>
                                    <div class="option-group" v-for="option in options" :key="option.index">
                                        <div class="option-name" v-if="option.option_group=='etc'">
                                            <span>{{ option.option_name }}</span>
                                            <span v-html="space"></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="inner-wrap">
                    <div class="inner-title">
                        등록자 정보
                    </div>
                    <div class="inner-content">
                        <div class="profile">
                            <div class="image">
                                <img :src="writer.mem_image">
                            </div>
                            <div class="inform">
                                <div class="nickname">    
                                    <span>{{ writer.mem_nickname }}</span>
                                </div>
                                <div class="confirm" v-if="writer.mem_confirm=='y'">
                                    <span>
                                        <span v-html="check"></span>
                                        <span> 인증</span>
                                    </span>
                                </div>
                                <div class="no-confirm" v-else-if="writer.mem_confirm=='n'">
                                    <span>미인증</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <updateRoomBtn :id="this.room.mem_id" :roomNumber="this.roomNumber"/>
                <btnEmail :roomMemId="this.room.mem_id"/>
            </div>

        </div>
        
        
    </div>
</template>

<script>
import updateRoomBtn from "@/components/updateRoomBtn.vue"
import btnEmail from "@/components/btnEmail.vue"
import axios from 'axios'
import hashTag from "@/components/hashTag"
import wishbutton from '@/components/wishButton.vue'
export default {
    components: {
        hashTag,
        wishbutton,
        updateRoomBtn,
        btnEmail
    },
    name: 'RoomDetail',
    data() {
        return {
            roomNumber:this.$route.query.roomId,
            room:[],
            roomReport:'',
            options:[],
            roomImg:[],
            interval:0,
            roomRegion:'',
            wish:false,
            writer:[],
            space:'&nbsp;&nbsp;',
            check:'&#10003;',
            text:'',
        }
    },
    mounted() {
        console.log(typeof this.roomNumber, this.roomNumber);
        const roomNumber=this.roomNumber;
        function getRoomDetail() {
            return axios.get('/api/roomDetail', {
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

        axios.all([getRoomDetail(), getRoomOption()])
            .then(axios.spread( (room, option) => {
                this.room=room.data;
                this.options=option.data;
                this.roomImg=this.room.room_images.split(',');
                if(this.room.room_address.split(' ')[0]=="서울") {
                    this.roomRegion=this.room.room_address.split(' ')[0]
                    +' '+this.room.room_address.split(' ')[1]
                    +' '+this.room.room_address.split(' ')[2];
                }else {
                    this.roomRegion=this.room.room_address.split(' ')[0]
                    +' '+this.room.room_address.split(' ')[1]
                    +' '+this.room.room_address.split(' ')[2]
                    +' '+this.room.room_address.split(' ')[3];
                }
                
                this.roomReport=this.room.room_report.replace(/(\n|\r\n)/g, '<br>');
            })
        );
    },
    watch: {
        room: function (roomData) {
            axios.get('/api/writer', {
                params: {
                    id: roomData.mem_id
                }
            }).then(res=>{
                this.writer=res.data;
            });
        },
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