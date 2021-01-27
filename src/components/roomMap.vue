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
    props: {
        roomAddr: Array,
    },
    data() {
        return {
            searchText:'',
            rooms:[],
        }
    },
    mounted() {
        window.kakao && window.kakao.maps
        ? this.initMap()
        : this.addKakaoMapScript();
    },
    methods: {
        initMap() {
            const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
            const options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(37.5666805, 126.9784147), //지도의 중심좌표.
                level: 6 //지도의 레벨(확대, 축소 정도)
            };
            const listData=this.roomAddr;
            console.log("props-roomAddr : "+this.roomAddr);
            console.log("listData : "+listData);
            const map = new kakao.maps.Map(container, options); // 맵 표시
            const geocoder = new kakao.maps.services.Geocoder; // 주소 -> 좌표 변환 라이브러리 생성
            // for loop
            for(let i=0;i<listData.length;i++) {
                geocoder.addressSearch(listData[i], function(result, status) { 
                    if (status === kakao.maps.services.Status.OK) {
                        const coords=new kakao.maps.LatLng(result[0].y, result[0].x)
                        const marker=new kakao.maps.Marker({ map: map, position: coords, clickable: true });
                        marker.setMap(map);
                    }
                });
            }
            // 인포윈도우를 생성합니다 
            // const infowindow = new kakao.maps.InfoWindow({ 
            //     content: '<div style="width:150px;text-align:center;padding:6px 0;">' + listData[i] + '</div>', 
            //     removable : true }); 
            // 마커에 클릭이벤트를 등록합니다 
            // kakao.maps.event.addListener(marker, 'click', function() { 
            // 마커 위에 인포윈도우를 표시합니다 
            // infowindow.open(map, marker); 
            // });            
        },
        addKakaoMapScript() {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d7a8d55394ad417e2d34f6d1c7b9d0f8";
            document.head.appendChild(script);
        },
    }

}
</script>

<style scoped src="@/static/css/roomMap.css">
</style>
<style scoped src="@/static/css/searchBox.css">
</style>