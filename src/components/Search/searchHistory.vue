<template>
        <div>
              <!-- <div class="search_div_title">최근 검색어</div> -->
              <ul class="wordListTop" >
                  <li class="wordList" style="color:grey">{{tab}}<a href="#" v-show="recentSearchWordsList()!=null && tab=='최근검색어' && recentSearchWordsList().length!=0" @click="deleteAllKeyword()" style="float:right">전체 삭제</a></li>
                  <template v-if="secondKeyword==''">
                      <template v-if="recentSearchWordsList()!=null&&recentSearchWordsList().length!=0">
                        <li v-for="(recentSearchWord,index) in recentSearchWordsList()" :key="recentSearchWord.keywordId" class="wordList">
                                <div @click="wordToSearchbox(recentSearchWord.keywordContent)" style="width:90%;float:left;">{{recentSearchWord.keywordContent}}</div>
                                <a  href="#"  @click="deleteKeyword(recentSearchWord.keywordId,index)" style="float:right">삭제</a><br>
                        </li>
                      </template>
                      <template v-else>
                          <li class="wordListNone">
                            최근검색어가 없습니다.
                          </li>
                      </template>

                  </template>
                  <template v-else>
                    <template v-if="words!=null">
                            
                            <li v-for="word in words" :key="word.id" class="wordList" @click="wordToSearchbox(word.place_name)">
                                {{word.place_name}}<span class="categoryName">{{word.category_name}}</span>
                            </li>
                    </template>
                    <template v-else>
                            <li class="wordListNone">
                                연관검색어가 없습니다.
                            </li>
                    </template>
                  </template>
                 
              </ul>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    created(){

        console.log(this.recentSearchWordsList())
        this.tab=this.selectedTab[0];
        this.getAllSearchText();
    },
    props:{
        keyword:{
            type:String,
        }
    },
    data(){
        return{
            tab:'',
            selectedTab:['최근검색어','연관검색어'],
            words:null,
            recentSearchWords:null,
            recentSearchWordsList:()=>{
                const list=[];
                if(this.recentSearchWords==null){
                    return null
                    
                }else{
                    for(let i=this.recentSearchWords.length-1;i>-1;i--){
                        list.push(this.recentSearchWords[i])
                        if(list.length==5){
                            return list
                        }
                    }
                    return list
                }
                
            },
            secondKeyword:'',
        }
    },
    watch:{
        keyword(newVal, oldVal){
            this.secondKeyword=newVal;
            this.getkeyword(newVal);
        }
    },
    methods:{
        getkeyword(newVal){
            if(newVal==''){
                this.tab=this.selectedTab[0];
                this.getAllSearchText();
            }else{
                this.tab=this.selectedTab[1];
                axios({
                    url:'https://dapi.kakao.com/v2/local/search/keyword.json?analyze_type=similar&page=1&size=5&query='+encodeURIComponent(newVal),
                type:'GET',
                headers: {'Authorization' : 'KakaoAK '+process.env.VUE_APP_KAKAO_SEARCH_APP_KEY}
                }).then((res)=>{
                    if(res.data.documents.length>0){
                        this.words=res.data.documents
                    }else{
                        this.words=null
                    } 
                })
            }
            
        },
        wordToSearchbox(word) {
            this.$emit('changeWord', word);
        },
        getAllSearchText(){
            if(this.$store.state.Login.userId!=null){
                    const param=new URLSearchParams({
                    id:this.$store.state.Login.userId
                })
                axios.post('/api/getAllSearchText',param,{
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data.length===0){

                        this.recentSearchWords=null
                    }else{
                        this.recentSearchWords=res.data;
                    }
                    
                })
            }else{
                
                this.recentSearchWords=this.$store.getters['Login/GETALLKEYWORD'];
            }
            
        },
        deleteKeyword(keywordId,keywordIndex){
            if(this.$store.state.Login.userId!=null){
                    const param=new URLSearchParams({
                    id:this.$store.state.Login.userId,
                    keywordSq:keywordId
                })
                axios.post('/api/deleteKeyword',param,{
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data!="1"){
                        this.$store.dispatch("Login/LOGOUTCLICK")
                    }else{
                        this.getAllSearchText();
                    }
                    
                })
            }else{
                this.$store.dispatch("Login/DELETEKEYWORD",{keywordIndex})
            }
            
        },
        deleteAllKeyword(){
            if(this.$store.state.Login.userId!=null){
                 const param=new URLSearchParams({
                 id:this.$store.state.Login.userId
                })
                axios.post('/api/deleteAllKeyword',param,{
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken
                    }
                }).then(res=>{
                    if(res.data!="1"){
                        this.$store.dispatch("Login/LOGOUTCLICK")
                    }else{
                        this.getAllSearchText();
                    }
                    
                })
            }else{
                this.$store.dispatch("Login/DELETEALLKEYWORD")
                this.getAllSearchText();
            }
           
        },
    }
    
}
</script>

<style scoped src="@/static/css/searchBox.css">

</style>