<template>
    <div 
        id="updateRoomButton" 
        @click="goUpdateRoom"
        v-b-popover.hover.topleft="popoverConfig"
        data-html="true"
        v-if="myRoom"
    >
        <img src="edit.png">
    </div>
</template>

<script>
export default {
    props: {
        id:String,
        roomNumber:String
    },
    data() {
        return {
            text:'\r\n'
        }
    },
    methods: {
        goUpdateRoom() {
            this.$router.push({name: 'UpdateRoom', query: { roomId:this.roomNumber }});
        }
    },
    computed: {
      popoverConfig() {
        return {
          html: true,
          content: () => {
            return '방 정보를 수정하거나 방을 삭제하려면<br>여기를 클릭하세요 :-)'
          }
        }
      },
      myRoom() {
            if(this.id==this.$store.state.Login.userId) {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>

<style scoped>
    #updateRoomButton {
        position:fixed;
        width:52px;
        height:52px;
        border-radius: 26px;
        box-shadow: 0px 0px 8px #a2a2a2;
        z-index:2;
        top:93vh;
        left:calc(50vw + 345px);
        background: #ff6600;
        text-align:center;
        line-height:45px;
        cursor:pointer;
    }
    
    @media (max-width:840px) {
        #updateRoomButton {
            left:calc(100vw - 80px);
        }
    }
</style>