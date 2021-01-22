<template>
  <div id="map" class="map">
  </div>
</template>



<script>
export default {
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
    #map {
        width:840px;
        height:100%;
    }
</style>