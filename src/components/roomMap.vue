<template>
    <div class="room-map-wrap">
          <div id="map" class="map">
              <!-- 지도 들어갈 곳 -->
          </div>
          <div id="search-bar" class="bg-white center-block">
              <div class="search_icon right-float bg-orange">
                  <img src="@/static/images/search_icon.png" class="icon_size">
              </div>
              <div class="main_search_text left-float">
                  <input v-model="searchText" class="main_search_form" placeholder="지역, 지하철, 대학교 검색" @keyup.enter="initMap">
              </div>
              <!-- <div class="filter-button" title="검색 조건 설정하기" @click="openFilter">
                  <img src="filter1.png" width="24">
              </div> -->
          </div>
          <!-- <div class="search_div" v-show="divStatus">
            <div class="search_div_title">최근 검색 기록</div>
          </div> -->
      </div>
</template>

<script>
export default {
    props: {
        rooms: Array,
        searchTxt: {
            type: String
        }
    },
    data() {
        return {
            mainSearch:this.searchTxt,
            defaultLatLng:new kakao.maps.LatLng(37.5666805, 126.9784147),
            defaultLevel:7,
            searchText:'',
            forLoops:0,
        }
    },
    mounted() {
        window.kakao && window.kakao.maps
        ? this.initMap()
        : this.addKakaoMapScript();
    },
    methods: {
        openFilter() {
            this.$bvModal.show('room-filter');
        },
        initMap() {
            this.forLoops=0;
            const listData=this.rooms;
            console.log("initMap")

            const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
            const options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: this.defaultLatLng, //지도의 중심좌표.
                level: this.defaultLevel //지도의 레벨(확대, 축소 정도)
            };
            
            const map = new kakao.maps.Map(container, options); // 맵 표시
            const geocoder = new kakao.maps.services.Geocoder; // 주소 -> 좌표 변환 라이브러리 생성

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
                console.log("검색어", typeof this.searchText);
                ps.keywordSearch(this.searchText, placesSearchCB);
            }

            if(this.searchText!='') {
                this.mainSearch='';
                searchKeyword();
            } else if(this.mainSearch!='') {
                this.searchText=this.mainSearch;
                searchKeyword();
            }
        
            const overlay = new kakao.maps.CustomOverlay({
                clickable: true,
                xAnchor:-0.1
            });   // 오버레이 생성
            let clickedOverlay=null;  // 클릭된 오버레이를 저장할 변수
            let clickedRoom=[];   // 클릭된 오버레이의 방 정보를 저장할 변수

            const addrList=[];
                if(this.forLoops==0){
                    // for loop
                    listData.forEach( item => {
                        geocoder.addressSearch(item.room_address, (result, status) => { 
                            if (status === kakao.maps.services.Status.OK) {
                                
                                // room_address(주소) 배열을 돌면서 하나씩 꺼내서 좌표로 변환
                                const coord=new kakao.maps.LatLng(result[0].y, result[0].x);

                                const imageSrc = 'marker.png', // 마커이미지 주소  
                                imageSize = new kakao.maps.Size(50, 50), // 마커이미지 크기
                                imageOption = {offset: new kakao.maps.Point(30, 50)}; // 마커이미지 위치
                            
                                // 마커 생성
                                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                                const marker= new kakao.maps.Marker({
                                    map: map, 
                                    position: coord, 
                                    clickable: true, 
                                    image: markerImage
                                });
                                marker.setMap(map);
                                kakao.maps.event.addListener(marker, 'click', () => {
                                    console.log("roomId",item.room_id);
                                    
                                    const customOverlay=document.createElement('div');
                                    customOverlay.className='customOverlay';
                                    customOverlay.id=item.room_id;
                                    const overlayImg=document.createElement('div');
                                    overlayImg.id='overlay-image';
                                    const imageTag='<img src="'+item.room_images.split(',')[0]+'">'
                                    overlayImg.innerHTML=imageTag;
                                    const overlayCnt=document.createElement('div');
                                    overlayCnt.id='overlay-content';
                                    let content='<span class="room-region">'
                                    +     item.room_address.split(' ')[0]+' '
                                    +item.room_address.split(' ')[1]+' '
                                    +item.room_address.split(' ')[2]
                                    +'  </span><br>'
                                    +'  <span class="room-title">'+item.room_title+'</span><br>'
                                    +     item.room_deposit+' / '+item.room_rent+'<br>';
                                    if(item.mem_gender=='f') {
                                        content=content+
                                        '<span class="overlay-mem-gender f">여성 호스트</span>'
                                    }else {
                                        content=content+
                                        '<span class="overlay-mem-gender m">남성 호스트</span>'
                                    }
                                    overlayCnt.innerHTML=content;
                                    customOverlay.appendChild(overlayImg);
                                    customOverlay.appendChild(overlayCnt);
                                    customOverlay.addEventListener('click', () => {
                                        this.$router.push({name: 'RoomDetail', query: {roomId: String(item.room_id)}});
                                    });

                                    const markerPosition=marker.getPosition();
                                    geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), function(result, status) {
                                    if (status === kakao.maps.services.Status.OK) {
                                        if(result[0].address.address_name==item.room_address){
                                        clickedRoom=item;
                                        overlay.setPosition(markerPosition);
                                        overlay.setContent(customOverlay);
                                        map.panTo(markerPosition);
                                        overlay.setMap(map);
                                        }
                                    }
                                    });
                                    clickedOverlay=overlay;
                                });

                                kakao.maps.event.addListener(map, 'click', function() {
                                    overlay.setMap(null)
                                })
                            }
                        });
                    }); //forLoops끝
                }

        // 리스너 동작 후 리스트만 가져올 함수
        const getAddr = () => {
            this.forLoops=0;
            return new Promise((resolve) => {
                // 지도의 범위 추출
                const bounds=map.getBounds();
                const addrList=[];
                addrList.slice(0);

                console.log("getAddr실행", this.forLoops);
                if(this.forLoops==0){
                    // for loop 
                    listData.forEach( item => {
                        geocoder.addressSearch(item.room_address, (result, status) => { 
                            if (status === kakao.maps.services.Status.OK) {
                                // room_address(주소) 배열을 돌면서 하나씩 꺼내서 좌표로 변환
                                const coord=new kakao.maps.LatLng(result[0].y, result[0].x);
                                
                                // 해당 좌표가 현재 지도 범위 안에 있는지 확인(true or false)
                                const visible=bounds.contain(coord);
                                if(visible) {
                                    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
                                        if (status === kakao.maps.services.Status.OK) {
                                            addrList.push(result[0].address.address_name);
                                            this.forLoops++;
                                            if(this.forLoops-1==this.rooms.length-1) {
                                                resolve(addrList);
                                            }
                                        }
                                    });
                                } else {
                                    this.forLoops++;
                                    if(this.forLoops-1==this.rooms.length-1) {
                                        resolve(addrList);
                                    }
                                }
                            }
                        });
                    });
                }
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
                if(i==this.rooms.length-1) {
                    this.$emit('changeList', roomList);
                    this.forLoops=0;
                }
            }
        };

        kakao.maps.event.addListener(map, 'dragend', function() {
            if(clickedOverlay!=null) {
                overlay.setMap(null);
            }
            (async () => {
                try {
                    console.log("dragend 실행");
                    const markers = await getAddr();
                    if(markers.length>0) {
                        getRoomList(markers);
                    }
                }catch (e) {
                    console.log(e);
                }
            })();
        });

        kakao.maps.event.addListener(map, 'zoom_changed', function() {
            if(clickedOverlay!=null) {
                overlay.setMap(null);
            }
            (async () => {
                try {
                    console.log("zoom_changed 실행");
                    const markers = await getAddr();
                    getRoomList(markers);
                }catch (e) {
                    console.log(e);
                }
            })();
        });
        
        if(this.searchText=='' || (typeof this.searchText=='undefined')) {
            (async () => {
                try {
                    const markers = await getAddr();
                    if(markers.length>0) {
                        console.log("익명함수 async 실행");
                        getRoomList(markers);
                    }
                }catch (e) {
                    console.log(e);
                }
            })();
        }
    },
    addKakaoMapScript() {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
            "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=cc44e897173478d81e22eb6205e99007";
        document.head.appendChild(script);
    },
   

  }
}
</script>

<style scoped src="@/static/css/roomMap.css">
</style>
<style scoped src="@/static/css/searchBox.css">
</style>
<style>
  .list-room-wrap {
    padding-top:60px;
    height:100vh;
    }
    .customOverlay {
    width:210px;
    height:260px;
    background:white;
    border-radius:15px;
    box-shadow:0 0 20px 1px #bdbdbd;
    overflow:hidden;
    cursor:pointer;
    }
    #overlay-image {
    width:210px;
    height:150px;
    }
    #overlay-image img{
    width:210px;
    height:150px;
    }
    #overlay-content {
    width:210px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding:5px 10px;
    }
    .room-title {
        font-weight:700;
        font-size:1em;
    }
    .room-region {
        font-size:0.7em;
        color:#6e6e6e;
        margin-bottom:10px;
    }

    .overlay-mem-gender {
        font-size:0.7em;
        border-radius:2px;
        float:left;
        margin-top:5px;
    }

    .m {
        background:rgb(213, 240, 255);
        color:black;
    }

    .f {
        background:rgb(255, 232, 236);
        color:black;
    }

    .filter-button {
        padding:16px 22px 16px 16px;
        cursor:pointer;
    }
</style>