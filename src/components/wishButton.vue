<template>
    <div id="wish-button" @click="changWishStatus">
        <div id="wish-icon" v-if="this.wish==true" title="찜 해제">
            <img src="wish_on.png" width="22">
        </div>
        <div id="wish-icon" v-else title="찜하기">
            <img src="wish_off.png" width="22">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        roomId: String
    },
    data() {
        return {
            roomNumber:this.roomId,
            userId:this.$store.state.Login.userId,
            wish:false,
            message:''
        }
    },
    mounted() {
        console.log("roomId",typeof this.roomId);
        if(this.userId!=null) {
            this.getWish();
        }
    },
    methods: {
        getWish() {
            const params=new URLSearchParams({
                id:this.userId,
                roomId:this.roomNumber
            });
            axios({
                url: '/api/wish', 
                method: "GET",
                params: params,
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken
                }
            }).then(res=>{
                this.wish=res.data;
                console.log("getWish",res.data);
            });
        },
        changWishStatus() {
            if(this.userId==null) {
                this.$bvModal.show('loginModal')
            }else {
                const params=new URLSearchParams({
                    id:this.userId,
                    roomId:this.roomNumber
                });
                if(this.wish==false) {
                    axios({
                        url: '/api/wish', 
                        method: "POST",
                        params: params,
                        headers:{
                            Authorization : "Bearer "+this.$store.state.Login.accessToken
                        }
                    }).then(() => {
                        this.getWish();
                        this.message='찜 목록에 추가되었습니다'
                        this.toast('b-toaster-top-center');
                        console.log("insert",this.wish);
                    });
                }else {
                    axios({
                        url: '/api/wish', 
                        method: "DELETE",
                        params: params,
                        headers:{
                            Authorization : "Bearer "+this.$store.state.Login.accessToken
                        }
                    }).then(() => {
                        this.getWish();
                        this.message='찜 목록에서 삭제되었습니다'
                        this.toast('b-toaster-top-center');
                        console.log("delete",this.wish);
                    });
                }
            }  
        },
        toast(toaster, append = false) {
            this.counter++
            this.$bvToast.toast(this.message, {
                toaster: toaster,
                appendToast: append,
                autoHideDelay: 1000,
                noCloseButton: true
            })
        }
    }
}
</script>

<style>

</style>