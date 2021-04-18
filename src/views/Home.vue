<template>
  <div class="home container">
    <div class="main_img"></div>
    <div class="main_section mx-auto">
      <div class="main_title mb-3">당신의<br>룸메이트는<br>어디에?</div>
      
        <searchBox/>

        <bestTag/>
      
    </div>
  </div>
</template>

<script>
import bestTag from "@/components/Search/bestTag"
import searchBox from "@/components/Search/searchBox"
export default{
  components:{
    searchBox, bestTag
  },
  data() {
    return {
      changed:this.$route.query.changed
    }
    
  },
  mounted() {
    if(this.changed==true) {
      this.$router.go(this.$router.currentRoute);
    }
  }
}
</script>
<style scoped src="@/static/css/home.css">
</style>
