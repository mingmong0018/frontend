<template>
  
  <div class="home container">
    <div class="main_img"></div>
    <div class="main_section mx-auto">
      <div class="main_title mb-3">당신의<br>룸메이트는<br>어디에?</div>
      <div class="main_search_group">
        <b-input-group class="mb-3">
          
          <b-input-group-prepend class="bg-orange p-2">
            <img src="@/static/images/search_icon.png" class="main_icon_size">
          </b-input-group-prepend>
          <b-form-input class="border-orange bg-white" placeholder="지역, 지하철, 대학교 검색"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Button" variant="white" class="bg-white border-orange"><img src="@/static/images/location_icon.png" class="main_icon_size"></b-button>
          </b-input-group-append>
        </b-input-group>
        <searchBox/>
      </div>
    </div>
  </div>
</template>

<script>
import searchBox from "@/components/searchBox"
export default{
  components:{
    searchBox
  }
 
}
</script>
<style scoped src="@/static/css/home.css">
</style>
