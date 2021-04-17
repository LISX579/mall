<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tab-control" v-show="isTabFixed"/>
<!--:probe-type绑定scroll中的值，是否监听位置信息-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/good/GoodsList";


import {getHomeMultidata , getHomeGoods} from "@/network/home";

import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
import {imgListenerMixin} from "@/common/mixin";


export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,

    Scroll,
    BackTop,
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [imgListenerMixin],
  data(){
    return {
      result:null,
      banners: [],
      recommends: [],
      goods: {
        'pop':  {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: true,
      tabOffsetTop: 0 ,
      isTabFixed: false,
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()



    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = -(position.y) > 1000

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('加载完成');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  // keep-alive状态下进来的时候的生命周期
  activated() {
    // 同时刷新better-scroll防止不能滚动
    this.$refs.scroll.refresh();
  },
  // keep-alive状态下离开的时候的生命周期
  deactivated() {
    // 取消home组件事件总线的监听
    this.$bus.$off("imgLoad", this.imgListener);
  }
}
</script>


<!--<style scoped>中的scoped是代表样式仅对当前Vue组件中代码生效-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }


  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 600;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content {
    /*overflow-x:scroll;*/
    /*overflow-y:hidden;*/

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
