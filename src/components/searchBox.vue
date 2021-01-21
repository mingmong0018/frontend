<template>
    <div class="main_search_group">
        <!-- <b-input-group class="mb-3" size="lg">
          <b-input-group-prepend class="bg-orange p-3">
            <img src="@/static/images/search_icon.png" class="main_icon_size">
          </b-input-group-prepend>
          <b-form-input class="border-orange bg-white" placeholder="지역, 지하철, 대학교 검색"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Button" variant="white" class="bg-white border-orange"><img src="@/static/images/location_icon.png" class="main_icon_size"></b-button>
          </b-input-group-append>
        </b-input-group> -->
        <div class="main_search_bar border-orange">
          <div class="main_search_icon bg-orange left-float">
            <img src="@/static/images/search_icon.png" class="main_icon_size">
          </div>
          <div class="main_search_text left-float">
            <input v-model="searchText" class="main_search_form" placeholder="지역, 지하철, 대학교 검색" @click="toggleDiv">
          </div>
          <div class="main_location_icon right-float">
            <b-button size="sm" variant="white">
              <img src="@/static/images/location_icon.png" class="main_icon_size">
            </b-button>
          </div>
        </div>
        <div class="search_div" v-show="divStatus">
          <div class="search_div_title">최근 검색 기록</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      divStatus:false,
      searchText:''
    }
  },
  methods: {
    toggleDiv() {
      this.divStatus=!this.divStatus;
    },
  }

}
</script>

<style scoped src="@/static/css/searchBox.css">
</style>