<template>
    <b-modal id="loginModal"
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

<style scoped>
    #loginModal {
        text-align: center;
    }
    #loginModal div {
        height: 450px;
    }
    .loginButtons {
        position: relative;
        width: 60%;
        height: 45px;
        margin-bottom: 20px;
        border: none;
    }
    #loginKakao {
        background: #fee100;
        color: black;
    }
    #loginNaver {
        background: #19ce60;
    }
    #loginGoogle {
        background: #e3e3e3;
        color: black;
    }
    .loginButtons img {
        float:left;
        width: 40px;
        margin-right: 40px;
        padding-bottom: 10px;
    }
    .loginText {
        float:left;
        text-align:center;
        line-height:32px;
    }
</style>