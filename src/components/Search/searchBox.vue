<template>
    <div class="main_search_group">
        <div class="main_search_bar border-orange">
          <div class="main_search_icon bg-orange left-float">
            <img src="@/static/images/search_icon.png" class="main_icon_size">
          </div>
          <div class="main_search_text left-float">
            <input @input="typing" ref="search" class="main_search_form" placeholder="지역, 지하철, 대학교 검색" :value="searchText" @click="toggleDiv" @keyup.enter="goSearch(searchText)" @keydown="trueDiv">
          </div>
          <div class="main_location_icon right-float">
            <b-button size="sm" variant="white" @click="goSearch(searchText)">
              <img src="@/static/images/location_icon.png" class="main_icon_size">
              <!-- <router-link to="/SearchRoom"><img src="@/static/images/location_icon.png" class="main_icon_size"></router-link> -->
            </b-button>
          </div>
        </div>
        <div class="search_div" v-if="divStatus">
          <searchHistory :keyword="fasterSearchText" @changeWord="newSearchText"/>
          
          
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import searchHistory from '@/components/Search/searchHistory.vue'
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
    newSearchText(word) {
      this.$refs.search.focus();
      this.goSearch(word);
    },
    toggleDiv() {
      this.divStatus=!this.divStatus;
    },
    trueDiv() {
      this.divStatus=true;
    },

    goSearch(text) {
      this.searchText=text
      if(text!=''){
      this.savingSearchText()
      }
      // console.log("typeof searchText : "+typeof text)
      this.$router.push({name: 'SearchRoom', params: {mainSearchText: text}})

    },
    typing(e){
      this.searchText=e.target.value
    },
     savingSearchText(){
       if(this.$store.state.Login.userId!=null){
         const param=new URLSearchParams({
            id:this.$store.state.Login.userId,
            searchText:this.searchText
        })
        axios.post(process.env.VUE_APP_AXIOS_URL+'/savingSearchText',param,{
            headers:{
                Authorization : "Bearer "+this.$store.state.Login.accessToken
                }
        }).then()
       }else{
         const keyword=this.searchText;
         this.$store.dispatch("Login/ADDKEYWORD",{keyword})
       }
        
    }
  },
  computed:{
    fasterSearchText(){
      return this.searchText
    }
  }
}
</script>

<style scoped src="@/static/css/searchBox.css">
</style>