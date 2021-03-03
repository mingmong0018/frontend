<template>
    <div class="room-detail-wrap">
        <div id="room-detail">
            <div id="room-detail-head">
                <div id="room-title">
                    {{ room.room_title }}
                </div>
                <div id="wish-button" @click="changWishStatus">
                    <div id="wish-icon" v-if="this.wish==true" title="찜 해제">
                        <img src="wish_on.png" width="22">
                    </div>
                    <div id="wish-icon" v-else title="찜하기">
                        <img src="wish_off.png" width="22">
                    </div>
                </div>
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
                        :img-src="imageUrl+image">
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
                                            {{ option.option_name }}
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
                                            {{ option.option_name }}
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
                                <div class="no-confirm" v-else>
                                    <span>미인증</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inner-wrap">
                    <div class="inner-title">댓글</div>
                    <div class="inner-content">
                        <div class="rep">
                            <div class="no-rep">
                                등록된 댓글이 없습니다.<br>
                                첫번째 댓글을 작성해 보세요!
                            </div>
                            <div class="rep-register" style="font-size:0.7em;">
                                <b-form-textarea
                                    id="room-rep"
                                    v-model="text"
                                    placeholder="댓글을 입력하세요"
                                    rows="3"
                                    max-rows="6"
                                    style="font-size:12px;"
                                ></b-form-textarea>
                            </div>
                        </div>
                    </div>
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
    name: 'RoomDetail',
    data() {
        return {
            roomNumber:this.$route.query.roomId,
            room:[],
            roomReport:'',
            options:[],
            imageUrl: "room/",
            roomImg:[],
            interval:0,
            roomRegion:'',
            wish:false,
            writer:[],
            space:'&nbsp;&nbsp;',
            check:'&#10003;',
        }
    },
    methods: {
        changWishStatus() {
            const params=new URLSearchParams({
                id:localStorage.userId,
                roomId:this.room.room_id
            });
            if(this.wish==false) {
                axios.post('/api/wish',params,
                {
                    headers:{
                    Authorization : "Bearer "+localStorage.accessToken
                }
                }).then(function() {
                    this.wish=!this.wish;
                });
            }else {
                axios.delete('/api/wish',params,
                {
                    headers:{
                    Authorization : "Bearer "+localStorage.accessToken
                }
                }).then(function() {
                    this.wish=!this.wish;
                });
            }
            
        }
    },
    mounted() {
        const roomNumber=this.roomNumber;
        const params=new URLSearchParams({
                id:localStorage.userId,
                roomId:roomNumber
            });1
        axios.get('/api/wish',params,{
                headers:{
                    Authorization : "Bearer "+localStorage.accessToken
                }
            }).then((res) => {
                this.wish=res.data;
            });
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
                this.roomRegion=this.room.room_address.split(' ')[0]+' '+this.room.room_address.split(' ')[1]+' '+this.room.room_address.split(' ')[2];
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
        }
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