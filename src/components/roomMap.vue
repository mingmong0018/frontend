<template>
    <div class="room-map-wrap">
        <div id="map" class="map">
            
        </div>
        <div id="search-bar" class="bg-white center-block">
            <div class="search_icon left-float bg-orange">
                <img src="@/static/images/search_icon.png" class="icon_size">
            </div>
            <div class="main_search_text left-float">
                <input v-model="searchText" class="main_search_form" placeholder="지역, 지하철, 대학교 검색">
            </div>
        </div>
        <!-- <div class="search_div" v-show="divStatus">
          <div class="search_div_title">최근 검색 기록</div>
        </div> -->
    </div>
</template>



<script>
export default {
    data() {
        return {
            searchText:'',
        }
    },
    mounted() {
        window.kakao && window.kakao.maps
        ? this.initMap()
        : this.addKakaoMapScript();
    },
    methods: {
        addKakaoMapScript() {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d7a8d55394ad417e2d34f6d1c7b9d0f8";
            document.head.appendChild(script);
            },
            initMap() {
                const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
                const options = {
                    //지도를 생성할 때 필요한 기본 옵션
                    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };
            const map=new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        }
    }

}
</script>

<style scoped src="@/static/css/roomMap.css">
</style>
<style scoped src="@/static/css/searchBox.css">
</style>