<template>
    <div 
        id="registerButton" 
        @click="goRegisterRoom"
        v-b-popover.hover.topleft="popoverConfig"
        data-html="true"
    >
        <img src="registerRoom.png">
    </div>
</template>

<script>
export default {
    data() {
        return {
            text:'\r\n'
        }
    },
    methods: {
        goRegisterRoom() {
            this.$router.push("/RegisterRoom");
        }
    },
    computed: {
      popoverConfig() {
        return {
          html: true,
          content: () => {
            return '룸메이트를 찾고 계신가요?<br/>내 방을 등록해보세요 :-)'
          }
        }
      }
    }
}
</script>

<style scoped>
    #registerButton {
        position:fixed;
        width:52px;
        height:52px;
        border-radius: 26px;
        background:#ff6600;
        box-shadow: 0px 0px 8px #a2a2a2;
        z-index:2;
        text-align:center;
        line-height:45px;
        top:92vh;
        left:calc(100vw - 1130px);
    }

    @media (max-width:1559px) {
        #registerButton {
            left:95vw;
        }
    }
</style>