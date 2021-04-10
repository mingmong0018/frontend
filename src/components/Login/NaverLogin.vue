<template>
    <div id="naverIdLogin"></div>
</template>

<script>
export default {
    mounted(){
        const naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.VUE_APP_NAVER_CLIENT_ID,
        callbackUrl: `http://shareroom-frontend.s3-website.ap-northeast-2.amazonaws.com/callback`,
        isPopup: false ,
        loginButton: {
            color: 'green',
            type: 3,
            height: 49
        }
        })
        naverLogin.init();
    },

}
</script>

<style>

</style>