<template>
  <div class="detail">
    <detail-nav-bar
      @titleItemClick="titleItemClick"
      ref="detailNavBar"/>
      <scroll
        :probe-type="3"
        @scroll="scroll"
        class="content"
        ref="scroll">
        <detail-swiper :top-images="topImages" class="detail-set-scroll" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shops" />
        <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
        <detail-param-info :param-info="paramsInfo" class="detail-set-scroll" />
        <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll" />
        <goods-list :goods="recommendList" :is-recommend="true" class="detail-set-scroll" />
      </scroll>
<!--    <detail-bottom-bar/>-->
    <!-- 回到顶部,监听组件的原生事件必须要用native修饰符变成原生组件 -->

    <detail-bottom-bar @addCart="addToCart"/>
    <transition name="scroll">
      <back-top @click.native="backTop" v-show="curPosition >= 1500" />
    </transition>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>


import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailImagesInfo from "@/views/detail/childComps/DetailImagesInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/good/GoodsList";
import Toast from "@/components/common/toast/Toast";

import BackTop from "@/components/content/backTop/BackTop";

import { getDetail, getRecommend, Goods, GoodsParams, Shop } from "@/network/detail";
import { backTopMixin, imgListenerMixin } from "@/common/mixin";


const axios = require('axios');
export default {
  name: "Detail",
  data() {
    return {
      detailId: "",
      // 轮播图数据
      topImages: [],
      goods: {},
      shops: {},
      detailsInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendList: [],
      detailClassList: [],
      detailIndex: 0,
      // message: '',
      // show: false
    };
  },
  mixins: [backTopMixin, imgListenerMixin],
  components: {
    DetailBaseInfo,
    DetailBottomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailImagesInfo,
    Scroll,
    DetailShopInfo,
    DetailSwiper,
    DetailNavBar,
    BackTop,
    Toast
  },
  beforeCreate() {
    // 进入详情页隐藏tabBar
    this.$store.commit("setTabBarShow", false);
  },
  created() {

    // 获取页面传过来的id
    this.detailId = this.$route.params.iid;

    // 发送网络请求
    this.getDetail();
    this.getRecommend();
  },
  // 路由离开的时候恢复tabBar
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setTabBarShow", true);
    next();
  },
  destroyed() {
    // 取消detail组件事件总线的监听
    this.$bus.$off("imgLoad", this.imgListener);
  },
  methods: {
    // 请求详情数据
    getDetail() {

      getDetail(this.detailId).then(res => {
        const data = res.result;

        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        // 获取商品数据,调用封装的ES6的class
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取店铺数据
        this.shops = new Shop(data.shopInfo);

        // 获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;

        // 获取尺寸数据
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      });
    },
    // 请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommendList = res.data.list;
      });
    },
    imgLoad() {
      this.$refs.scroll.refresh();
      // 图片加载完获取classList
      this.getClassList();
    },
    // navBar点击
    titleItemClick(index) {
      console.log(index)
      // 根据数组下标滚动到对应的元素内容位置
      this.$nextTick(() => {
        let el = document.getElementsByClassName("detail-set-scroll");
        this.$refs.scroll.scrollToElement(el[index], 300);
      });
    },
    // 获取classList
    getClassList() {
      // Array.from() 将伪数组转换成纯数组
      this.detailClassList = [];
      this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
      let maxValue = 10000000;
      this.detailClassList.push({ offsetTop: maxValue });
      // console.log(this.detailClassList);
    },
    // 监听详情页滚动事件,并动态设置navBar的index
    scroll(position) {
      let detailPosition = position ? -position.y : 0;
      this.curPosition = detailPosition;

      for (let i = 0; i < this.detailClassList.length - 1; i++) {
        if (
          detailPosition >= this.detailClassList[i].offsetTop &&
          detailPosition < this.detailClassList[i + 1].offsetTop
        ) {
          if (this.detailIndex !== i) {
            this.detailIndex = i;
            this.$refs.detailNavBar.currentIndex = this.detailIndex;
          }
          break;
        }
      }
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const  product = {}
      product.image=this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.lowNowPrice
      product.iid = this.detailId
      // console.log(product.iid)

      //2.将商品添加进购物车
      this.$store.dispatch('addCart',product).then( res => {
        // this.show = true
        // this.message = res
        //
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.show(res, 2000)
      })
    }
  }

};
</script>

<style scoped>
.detail {
  height: 100vh;

  position: relative;
  z-index: 1;
}

/* BScroll固定高度和区域 */
.content{
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}

</style>
