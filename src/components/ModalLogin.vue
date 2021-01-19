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
            <b-button class="loginButtons" id="loginGoogle">
                Google 로그인
            </b-button><br>
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            headerBorderVariant: '0'
        }
    },
    props: {
        
    }
}
</script>

<style scoped src="@/static/css/loginModal.css">
</style>