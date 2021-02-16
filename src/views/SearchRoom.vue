<template>
  <div class="list-room-wrap">
    <div class="room-map-wrap">
          <div id="map" class="map" :click="getCoods">
              <!-- 지도 들어갈 곳 -->
          </div>
          <div id="search-bar" class="bg-white center-block">
              <div class="search_icon right-float bg-orange">
                  <img src="@/static/images/search_icon.png" class="icon_size">
              </div>
              <div class="main_search_text left-float">
                  <input v-model="searchText" class="main_search_form" placeholder="지역, 지하철, 대학교 검색" @keyup.enter="initMap">
              </div>
          </div>
          <!-- <div class="search_div" v-show="divStatus">
            <div class="search_div_title">최근 검색 기록</div>
          </div> -->
      </div>
      <roomList :roomList="roomList"/>
    </div>
    
</template>

<script>
import axios from'axios'
import roomList from "@/components/roomList.vue"
export default {
  name: 'SearchRoom',
  props: {
    mainSearchText: {
      type: String
    }
  },
  components:{
    roomList,
  },
  data() {
    return {
      searchText:'',
      mainSearch:this.mainSearchText,
      rooms:[], // 서버에서 받아온 방 리스트
      roomList:[],  // roomList에 보내줄 리스트
      roomAddr:[],
      defaultLatLng:new kakao.maps.LatLng(37.5666805, 126.9784147),
      defaultLevel:5,
    }
  },
  mounted() {
    window.kakao && window.kakao.maps
    ? this.initMap()
    : this.addKakaoMapScript();
  },
  methods: {
    getCoods(event) {
      const clickedCoordX=event.clientX;
      const clickedCoordY=event.clienty;
      console.log("클릭:", clickedCoordX, clickedCoordY);
    },
    initMap() {
      axios.get('/api/listRoom'
      ).then((response)=>{
        this.rooms=response.data;
        console.log("axios 성공:",response);
        for(let i=0; i<this.rooms.length; i++) {
          this.roomAddr.push(this.rooms[i].room_address);
        }

        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: this.defaultLatLng, //지도의 중심좌표.
          level: this.defaultLevel //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); // 맵 표시
        
        // 키워드 검색 함수
        const searchKeyword = () => {
          const ps = new kakao.maps.services.Places();
          const placesSearchCB = (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const bounds = new kakao.maps.LatLngBounds();
              for (let i=0; i<data.length; i++) {
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }       
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map.setBounds(bounds);
            }
          }
          ps.keywordSearch(this.searchText, placesSearchCB);
        }

        if(this.searchText!='') {
          this.mainSearch='';
          searchKeyword();
        }

        if(this.mainSearch!='') {
          this.searchText=this.mainSearch;
          searchKeyword();
        }

        const geocoder = new kakao.maps.services.Geocoder; // 주소 -> 좌표 변환 라이브러리 생성

        const getMarkers = () => {
          return new Promise((resolve) => {
            const addrList=[];
            // for loop
            for(let i=0;i<this.rooms.length;i++) {
              geocoder.addressSearch(this.roomAddr[i], function(result, status) { 
                if (status === kakao.maps.services.Status.OK) {
                  // roomAddr(주소) 배열을 돌면서 하나씩 꺼내서 좌표로 변환
                  const coord=new kakao.maps.LatLng(result[0].y, result[0].x);

                  const imageSrc = 'marker.png', // 마커이미지의 주소입니다    
                  imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
                  imageOption = {offset: new kakao.maps.Point(30, 50)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    
                  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                  const marker=new kakao.maps.Marker({ map: map, position: coord, clickable: true, image: markerImage});
                  marker.setMap(map);
                  // 지도의 범위 추출
                  const bounds=map.getBounds();
                  // 해당 좌표가 현재 지도 범위 안에 있는지 확인(true or false)
                  const visible=bounds.contain(coord);
                  if(visible) {
                    geocoder.coord2Address(coord.getLng(), coord.getLat(), function(result, status) {
                      if (status === kakao.maps.services.Status.OK) {
                        addrList.push(result[0].address.address_name);
                      }
                    });
                  }
                }
              });
            }// for loop 끝
            window.setTimeout(function() {
              resolve(addrList);
            }, 1500);
          });
        }
        
        const getRoomList = markers => {
          const roomList=[];
          for(let i=0; i<this.rooms.length; i++) {
            for(let j=0; j<markers.length; j++) {
              if(this.rooms[i].room_address==markers[j]) {
                roomList.push(this.rooms[i]);
              }
            }
          }
          this.roomList=roomList;
        };

        // 리스너 동작 후 리스트만 가져올 함수
        const getAddr = () => {
          return new Promise((resolve) => {
            const addrList=[];
            addrList.slice(0);
            // for loop
            for(let i=0;i<this.rooms.length;i++) {
              geocoder.addressSearch(this.roomAddr[i], function(result, status) { 
                if (status === kakao.maps.services.Status.OK) {
                  // roomAddr(주소) 배열을 돌면서 하나씩 꺼내서 좌표로 변환
                  const coord=new kakao.maps.LatLng(result[0].y, result[0].x);

                  // 지도의 범위 추출
                  const bounds=map.getBounds();
                  // 해당 좌표가 현재 지도 범위 안에 있는지 확인(true or false)
                  const visible=bounds.contain(coord);
                  if(visible) {
                    geocoder.coord2Address(coord.getLng(), coord.getLat(), function(result, status) {
                      if (status === kakao.maps.services.Status.OK) {
                        addrList.push(result[0].address.address_name);
                      }
                    });
                  }
                }
              });
            }
            window.setTimeout(function() {
              resolve(addrList);
            }, 2000);
          });
        }
        
        kakao.maps.event.addListener(map, 'dragend', function() {
          this.defaultLatLng=map.getCenter();
          this.defaultLevel=map.getLevel();
          (async () => {
            try {
              const markers = await getAddr();
              getRoomList(markers);
            }catch (e) {
              console.log(e);
            }
          })();
        });

        kakao.maps.event.addListener(map, 'zoom_changed', function() {
          this.defaultLatLng=map.getCenter();
          this.defaultLevel=map.getLevel();
          (async () => {
            try {
              const markers = await getAddr();
              getRoomList(markers);
            }catch (e) {
              console.log(e);
            }
          })();
        });

        

        (async () => {
          try {
            const markers = await getMarkers();
            getRoomList(markers);
          }catch (e) {
            console.log(e);
          }
        })();
      });
    },
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d7a8d55394ad417e2d34f6d1c7b9d0f8";
      document.head.appendChild(script);
    }
  }
}
</script>

<style scoped src="@/static/css/roomMap.css">
</style>
<style scoped src="@/static/css/searchBox.css">
</style>
<style scoped>
  .list-room-wrap {
  padding-top:60px;
  height:100vh;
}
</style>
