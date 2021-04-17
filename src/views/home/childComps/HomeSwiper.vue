<template>
  <swiper class="swiper-list">
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: "HomeSwiper",


  data(){
    return{
      isLoad:true
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  mounted() {

  },
  methods: {
    imageLoad(){
      if (this.isLoad) {
        this.$emit('swiperImageLoad')
        // console.log('轮播图刷新')
        this.isLoad = false
      }
    }
  }
}
</script>

<style scoped>

</style>
