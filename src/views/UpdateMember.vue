<template>
  <div class="wrapper">
      <div class="wrap">
        <div class="mainForm">
            <div class="title">쉐어룸계정 정보를 입력해주세요</div>
            <inputGroup />
            
        </div>
      </div>

  </div>
</template>

<script>
import inputGroup from '@/components/UpdateMemberInputGroup.vue'
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

<style scope src="@/static/css/outline.css">


</style>