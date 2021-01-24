<template>
  <div class="room-list-content">
    <b-carousel
    id="carousel-no-animation"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    indicators
    img-width="340"
    img-height="230"
  >
    <div v-for="image in testImages" :key="image.key"> 
      <!-- 테스트 후 방데이터에서 이미지 빼서 테이블 새로 만들어야함 -->
      <b-carousel-slide
        caption="slide"
      ><img :src="imageUrl+image.name"></b-carousel-slide>
    </div>
  </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "@/static/images/room/",
      testImages: [
        {key:'51-1', name:'51_1.jpg'}, 
        {key:'51-2', name:'51_2.jpg'}, 
        {key:'51-3', name:'51_3.jpg'}, 
        {key:'51-4', name:'51_4.jpg'}, 
        {key:'51-5', name:'51_5.jpg'}
      ],
    }
  }

}
</script>

<style>

</style>