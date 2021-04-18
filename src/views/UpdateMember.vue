<template>
  <div id="register-room-wrap">
      <div id="register-room">
            <div class="title">쉐어룸계정 정보를 입력해주세요</div>
            <inputGroup />
            
      </div>

  </div>
</template>

<script>
import inputGroup from '@/components/Member/UpdateMemberInputGroup.vue'
export default {
    components: {
        inputGroup
    },
    data(){
        return {
            show:true
        }
    }
}
</script>
<style scoped src="@/static/css/registerUpdateRoom.css">
</style>