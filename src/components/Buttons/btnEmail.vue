<template>
    <div v-if="this.roomMemId!=this.$store.state.Login.userId">
        <b-button class="btnEmail" @click="checkUser">이메일 문의</b-button>
        <b-modal id="modalEmail"
            centered
            hide-footer
            :header-border-variant="headerBorderVariant"
            >
            <div>
                <p class="my-3 modalText">아래의 이메일로 문의하면 작성자와 연락할 수 있습니다 :)
                </p>
                <b-button disabled class="btnEmail" style="font-size:18px" @click="goMemberConfirm">{{roomMemEmail}}</b-button>
                <br>
                <br>

            </div>
        </b-modal>
        <b-modal id="modalMemberConfirm"
            centered
            hide-footer
            :header-border-variant="headerBorderVariant"
            >
            <div>
                <p class="my-3 modalText">본인인증 해주세요 :)
                </p>
                <b-button class="btnEmail" style="font-size:18px" @click="goMemberConfirm">본인인증 하러가기</b-button>
                <br>
                <br>

            </div>
        </b-modal>
    </div>
    
</template>

<script>

import axios from 'axios'
export default {

    
    data() {
        return {
            roomMemEmail:'',
            userId:this.$store.state.Login.userId,
            headerBorderVariant:'0'
            
        }
    },
    props:{
        roomMemId: String,
    },
    methods:{
       async getEmail2(){
           await this.getEmail();
           this.$bvModal.show('modalEmail')

       },
       getEmail(){
           const params=new URLSearchParams({
                    id:this.roomMemId,
                });
                axios({
                    url: process.env.VUE_APP_AXIOS_URL+'/memberEmail', 
                    method: "POST",
                    params: params,
                    headers:{
                        Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data!=''){
                        console.log("이메일: ", typeof res.data)
                        this.roomMemEmail=res.data;
                        console.log(res.data)
                    }else{
                        this.roomMemEmail="작성자의 이메일이 없습니다."
                    }
                });
       },
       checkUser(){
           if(this.userId!=null) {
                const params=new URLSearchParams({
                    id:this.userId,
                });
                axios({
                    url: process.env.VUE_APP_AXIOS_URL+'/memberConfirm', 
                    method: "POST",
                    params: params,
                    headers:{
                        Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data=='n'){
                        this.$bvModal.show('modalMemberConfirm')
                    }else{
                        
                        this.getEmail2();
                    }
                });
               
            }else{
                this.$bvModal.show('loginModal')
            }
       },
       goMemberConfirm(){
           this.$router.push({name: 'UpdateMember'})
       }
        
        
        
    },
    
}
</script>


<style scoped>
.btnEmail{
    width:100%;
    height:60px;
    color:white;
    text-align:center;
    font-size:20px;
    border:0px;
    background:#FF6600;
    margin:0px;
}
.modalText{
    text-align:center;
}
</style>