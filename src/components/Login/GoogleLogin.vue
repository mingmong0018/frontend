<template>

    <img src="@/static/images/googleLoginBtn.png" @click="handleClickGetAuth" class="loginButtons">

</template>

<script>
import axios from'axios'
export default {
    methods:{
        handleClickGetAuth(){
                this.$gAuth.signIn()
                .then(GoogleUser => {
                // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
                console.log('user', GoogleUser)
                // GoogleUser.getId() : Get the user's unique ID string.
                // GoogleUser.getBasicProfile() : Get the user's basic profile information.
                // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
                this.isSignIn = this.$gAuth.isAuthorized
                const params=new URLSearchParams({
                        accessToken : GoogleUser.getAuthResponse().access_token,
                        state : 'google'
                    });
                axios.post(process.env.VUE_APP_AXIOS_URL+'/login',params).then(res=>{
                        const tmp=String(res.data).split(",");
                        console.log(tmp);
                        const accessToken=tmp[0];

                        const userName=tmp[1];
                        const userId=tmp[2];
                        this.$store
                            .dispatch("Login/LOGIN", { accessToken, userName, userId })
                        this.$router.go(this.$router.currentRoute);
                        
                    
                    })
                })
                .catch(error  => {
                //on fail do something
                })
            
        }
    }
}
</script>

<style scoped src="@/static/css/loginModal.css">

</style>