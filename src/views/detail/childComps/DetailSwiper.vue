<template>
    <swiper class="detail-swiper">
      <swiper-item class="swiper-item" v-for="item in topImages" :key="item.id">
        <img :src="item" alt="" @click="swiperLoad">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad:true
    }
  },
  methods: {
    swiperLoad() {
      this.$emit("swiperLoad");
      this.isLoad = false;
    }
  }

}
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
