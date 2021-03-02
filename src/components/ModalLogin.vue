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
           
            <KakaoLogin />
            <GoogleLogin />
            <NaverLogin />

             
    
            
               
            
            <img src="@/static/images/shareroom_logo2.png" width="50" style="margin-top:40px;">
        </div>
    </b-modal>
</template>

<script>
import KakaoLogin from '@/components/Login/KakaoLogin.vue'
import GoogleLogin from '@/components/Login/GoogleLogin.vue'
import NaverLogin from '@/components/Login/NaverLogin.vue'


export default {
    components:{
        NaverLogin,
        KakaoLogin,
        GoogleLogin,
    },
    
    data() {
        return {
            headerBorderVariant:'0'
            
        }
    },
    methods:{
       
        
        
        
    },
    
}
</script>

<style scoped src="@/static/css/loginModal.css">
</style>