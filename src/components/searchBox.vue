<template>
    <div class="main_search_group">
        <div class="main_search_bar border-orange">
          <div class="main_search_icon bg-orange left-float">
            <img src="@/static/images/search_icon.png" class="main_icon_size">
          </div>
          <div class="main_search_text left-float">
            <input @input="typing" class="main_search_form" placeholder="지역, 지하철, 대학교 검색" @click="toggleDiv" @key.enter="goSearch" @keydown="trueDiv">
          </div>
          <div class="main_location_icon right-float">
            <b-button size="sm" variant="white">
              <router-link to="/SearchRoom"><img src="@/static/images/location_icon.png" class="main_icon_size"></router-link>
            </b-button>
          </div>
        </div>
        <div class="search_div" v-if="divStatus">
          <searchHistory :keyword="fasterSearchText"/>
          
          
        </div>
    </div>
</template>

<script>
import searchHistory from '@/components/searchHistory.vue'
export default {
  components:{
    searchHistory
  },
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
    trueDiv() {
      this.divStatus=true;
    },
    goSearch() {
      this.$router.push({name: 'SearchRoom', params: {mainSearchText: this.searchText}})
    },
    typing(e){
      
      this.searchText=e.target.value
    },
  },
  computed:{
    fasterSearchText(){
      console.log("typing : "+this.searchText)
      return this.searchText
    }
  }
}
</script>

<style scoped src="@/static/css/searchBox.css">
</style>