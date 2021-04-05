<template>
    <div 
        id="registerButton" 
        @click="goRegisterRoom"
        v-b-popover.hover.topleft="popoverConfig"
        data-html="true"
    >
        <img src="registerRoom.png">
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            myRoomId:''
        }
    },
    methods: {
        goRegisterRoom() {
            if(this.$store.state.Login.userId!=null) {
                const params=new URLSearchParams({
                    id:this.$store.state.Login.userId
                });
                axios({
                    url:'/api/getMember',
                    method:'GET',
                    params: params,
                    headers:{
                        Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data!=''){
                        this.getMyRoom();
                    }else{
                    this.$store.dispatch("Login/LOGOUTCLICK")
                    } 

                }).catch(( err ) => {
                    console.log( err );
                    throw err;
                })
            }else {
                this.$bvModal.show('loginModal');
            }
        },
        getMyRoom() {
            console.log("myRoom")
            const params=new URLSearchParams({
                id:this.$store.state.Login.userId
            });
            axios({
                url: '/api/myRoom', 
                method: "GET",
                params: params,
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken
                }
            }).then((res) => {
                console.log(res.data);
                if(res.data!='') {
                    this.myRoomId=String(res.data);
                    alert('이미 등록한 방이 있어요. 내 방으로 이동합니다:-)');
                    this.$router.push({name: 'RoomDetail', query: {roomId: this.myRoomId}});
                }else {
                    this.$router.push("/RegisterRoom");
                }
            })
        },
    },
    computed: {
        popoverConfig() {
                return {
                    html: true,
                    content: () => {
                        return '룸메이트를 찾고 계신가요?<br/>내 방을 등록해보세요 :-)'
                    }
                }
        }
    },
}
</script>

<style scoped>
    #registerButton {
        position:fixed;
        width:52px;
        height:52px;
        border-radius: 26px;
        background:#ff6600;
        box-shadow: 0px 0px 8px #a2a2a2;
        z-index:2;
        text-align:center;
        line-height:45px;
        top:92vh;
        left:calc(100vw - 1130px);
        cursor:pointer;
    }

    @media (max-width:1559px) {
        #registerButton {
            left:95vw;
        }
    }
</style>