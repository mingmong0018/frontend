<template>
        <div>
              <!-- <div class="search_div_title">최근 검색어</div> -->
              <ul class="wordListTop" >
                  <template v-if="words!=null">
                        <li v-for="word in words" :key="word.id" class="wordList" @click="wordToSearchbox(word.place_name)">
                            {{word.place_name}}
                        </li>
                  </template>
                  <template v-else>
                        <li class="wordListNone">
                            연관검색어가 없습니다.
                        </li>
                  </template>
                 
              </ul>
        </div>
</template>

<script>
import axios from 'axios'
export default {

    props:{
        keyword:{
            type:String,
        }
    },
    data(){
        return{
            words:null
        }
    },
    watch:{
        keyword(newVal, oldVal){
            console.log(newVal,oldVal)
            this.getkeyword(newVal);
        }
    },
    methods:{
        getkeyword(newVal){
            if(newVal==''){
                newVal=' '
            }
            axios({
                url:'https://dapi.kakao.com/v2/local/search/keyword.json?analyze_type=similar&page=1&size=5&query='+encodeURIComponent(newVal),
            type:'GET',
            headers: {'Authorization' : 'KakaoAK 1e5da3b26e96bf076dd3b50d1aea9b8e'},

            }).then((res)=>{
                console.log(res.data)
                if(res.data.documents.length>0){
                    this.words=res.data.documents
                }else{
                    this.words=null
                } 
            })
        },
        wordToSearchbox(word) {
            this.$emit('changeWord', word);
        }
    }
    
}
</script>

<style scoped src="@/static/css/searchBox.css">

</style>