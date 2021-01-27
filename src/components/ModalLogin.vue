<template>
    <b-modal id="loginModal"
        centered
        hide-footer
        :header-border-variant="headerBorderVariant"
        >
        <div>
            <p class="my-3">SNS 계정으로 간편하게 로그인하고
                <br>쉐어룸의 모든 서비스를 이용하세요 :)
            </p>
            <br>
            <br>
            <b-button class="loginButtons" id="loginKakao" icon-left="delete">
                KAKAO 로그인
            </b-button><br>
            <b-button class="loginButtons" id="loginNaver" @click="currentPath">
                NAVER 로그인
            </b-button><br>
            <!-- <b-button class="loginButtons" id="loginGoogle" :href=googleLoginURL> -->
            <b-button class="loginButtons" id="loginGoogle" @click="login">
                Google 로그인
            </b-button><br>

            <img src="@/static/images/shareroom_logo2.png" width="50" style="margin-top:40px;">
        </div>
    </b-modal>
</template>

<script>
import axios from'axios'
export default {
    data() {
        return {
            googleClientId:'166602658975-pu0k2i9jimdpkqn99fstlj2vnk2ct6ud.apps.googleusercontent.com',
            googleRedirectURI:'http%3A%2F%2Flocalhost%3A8070%2Flogin',
            googleScope:'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuser.birthday.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuser.gender.read',
            googleLoginURL:'https://accounts.google.com/o/oauth2/auth?response_type=code',
            googleState : 'g',

            headerBorderVariant: '0'
            
        }
    },
    methods:{
        login(){
            this.googleLoginURL += '&client_id=' + this.googleClientId
            this.googleLoginURL += '&redirect_uri=' + this.googleRedirectURI
            this.googleLoginURL += '&scope=' + this.googleScope
            this.googleLoginURL += '&state=' + this.googleState+"_"+document.location.href

            location.href=this.googleLoginURL;
        },

        currentPath(){
            alert("현재경로 : "+ document.location.href);
        }

        // login(){
        //     // const form=new FormData()
        //     // form.append('id',this.id);
        //     // form.append('pwd',this.pwd);
        //     const params=new URLSearchParams({
        //         apiURL:this.googleLoginURL,
               
        //     });
        //     // params.append('id',this.id);
        //     // params.append('pwd',this.pwd);
        //     axios.post('/api/hello',params).then(res=>{
                
        //         alert('token : '+res.data);
        //     })
        // }


        
        // login(){
        //     axios({
        //         method:'GET',
        //         url:'api/?apiURL='+this.googleLoginURL,

        //     }).then((response)=>{
        //         alert('token : '+response.data);
        //     })
        // }
    },
    
}
</script>

<style scoped src="@/static/css/loginModal.css">
</style>