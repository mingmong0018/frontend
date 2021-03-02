<template>
    <div id="naverIdLogin"></div>
</template>

<script>
export default {
    mounted(){
        const naverLogin = new window.naver.LoginWithNaverId({
        clientId: 'nO1V6uzdtXeEzzTuiFNM',
        callbackUrl: `http://localhost:8081/callback`,
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