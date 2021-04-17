<template>
<!--  ref/children-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null,
      // observeDOM: true
    }
  },
  //创建BScroll对象
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动的位置
    if(this.probeType === 2 || this.probeType===3){
      this.scroll.on('scroll',(position) =>{
        this.$emit('scroll',position)
      })
    }
    //3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () =>{
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo: function (x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      // console.log('刷新成功');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    // 滚动到指定元素
    scrollToElement(el, time) {
      this.scroll.scrollToElement(el, time);
    }
  },

}
</script>

<style scoped>

</style>
