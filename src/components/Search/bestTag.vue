<template>
    <div id="best-tag-div">
        <div id="best-tag" v-for="tag in bestTags" :key="tag.index" title="태그로 검색하기">
            <div @click="searchTag(tag.tag_content)">
                <span>#{{ tag.tag_content }}</span> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            bestTags:[]
        }
    },
    methods: {
        searchTag(tag) {
            this.$router.push({name: 'SearchRoom', params: {tag: tag}})
        }
    },
    mounted() {
        axios.get(process.env.VUE_APP_AXIOS_URL+'/bestTag')
        .then(res => {
            this.bestTags=res.data;
        })
    }
}
</script>

<style>
    #best-tag-div {
        margin-top:10px;
    }
    #best-tag {
        position:relative;
        height:35px;
        float:left;
    }

    #best-tag span {
        line-height:50px;
        margin-right:10px;
        padding:0 5px;
        font-size:1.25em;
        border-radius: 3px;
        background: #ffbb8e;
        cursor: pointer;
    }
</style>