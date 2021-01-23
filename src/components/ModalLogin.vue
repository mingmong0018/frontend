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
            <b-button class="loginButtons" id="loginNaver">
                NAVER 로그인
            </b-button><br>
            <b-button class="loginButtons" id="loginGoogle" :href="googleLoginURL">
                Google 로그인
            </b-button><br>

            <img src="@/static/images/shareroom_logo2.png" width="50" style="margin-top:40px;">
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            googleClientId:'166602658975-pu0k2i9jimdpkqn99fstlj2vnk2ct6ud.apps.googleusercontent.com',
            googleRedirectURI:'http%3A%2F%2Flocalhost%3A8070%2Flogin',
            googleScope:'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email&https://www.googleapis.com/auth/userinfo.profile',
            googleLoginURL:'https://accounts.google.com/o/oauth2/auth?response_type=code',
            
            headerBorderVariant: '0'
        }
    },
    props: {
        
    },
    created(){
        this.googleLoginURL += '&client_id=' + this.googleClientId
        this.googleLoginURL += '&redirect_uri=' + this.googleRedirectURI
        this.googleLoginURL += '&scope=' + this.googleScope
        



    }
}
</script>

<style scoped src="@/static/css/loginModal.css">
</style>