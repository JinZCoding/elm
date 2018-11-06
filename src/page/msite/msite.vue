<template>
    <div>
        <header-bar signin-up='msite'>
            <!-- 查找按钮 -->
            <!-- router-link动态绑定 -->
            <router-link :to="'/search'" class="link_search" slot="search">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			    <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			    <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		    </svg>
            </router-link>
            <!-- 中间部分 -->
            <router-link to="home" slot="msite-title" class="msite_title">
              <span class="title_text ellipsis">{{msiteTitle}}</span>
            </router-link>
        </header-bar>
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
                        <router-link to="home" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                            <figure>
                                <img :src="foodItem.image_url">
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <div @click="sortAll()" :class="{'filtermodel': sort_all}" @touchmove.prevent @scroll.prevent></div>
        <div class="shoplist_title">推荐商家</div>
        <div class="shoplist_nav" id="scroll" style="position: sticky; top: 1.9rem; z-index: 100;">
          <div class="list_nav">
            <!-- 点击出现下拉框 -->
            <a href="javascript:;" class="list_item" @click="sortAll()" :class="{sort_all: sort_all}">
              <!-- <span style="font-weight:700">{{  }}</span> -->
              <span style="font-weight:700">综合排序</span>
              <img src="../../images/down.svg" class="list_back_svg">
            </a>
            <a href="javascript:;" class="list_item"><span>距离最近</span></a>
            <a href="javascript:;" class="list_item"><span>品质联盟</span></a>
            <a href="#/search" class="list_item">
              <span>筛选</span>
              <img src="../../images/filter.svg" class="list_back_svg">
            </a>
          </div>
          <section class="filter-sort" :class="{'open': sort_all}" @touchmove.prevent @scroll.prevent>
            <ul>
              <li class="active">
                <span>综合排序</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>好评优先</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>销量最高</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>起送价最低</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>配送最快</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>配送费最低</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>人均从低到高</span><img src="../../images/select.svg" class="select_img">
              </li>
              <li>
                <span>人均从高到低</span><img src="../../images/select.svg" class="select_img">
              </li>
            </ul>
          </section> 
        </div>
        <div class="shoplist">
          <shop-list></shop-list>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import shopList from "../../components/common/shoplist";
import "../../plugins/swiper.min.js";
import "../../style/swiper.min.css";
export default {
  data() {
    return {
      sort_all: false,
      activeIndex: "1",
      msiteTitle: "红领巾公园",
      foodTypes: [
        [
          {
            id: 20,
            image_url: "../../static/img/type1.jpeg",
            is_in_serving: true,
            description: "苦了累了，来点甜的",
            title: "甜品饮品",
            title_color: ""
          },
          {
            id: 10,
            image_url: "../../static/img/type2.jpeg",
            is_in_serving: true,
            description: "足不出户，便利回家",
            title: "商超便利",
            title_color: ""
          },
          {
            id: 15,
            image_url: "../../static/img/type3.jpeg",
            is_in_serving: true,
            description: "附近美食一网打尽",
            title: "美食",
            title_color: ""
          },
          {
            id: 225,
            image_url: "../../static/img/type4.jpeg",
            is_in_serving: true,
            description: "有菜有肉，营养均衡",
            title: "简餐",
            title_color: ""
          },
          {
            id: 403297,
            image_url: "../../static/img/type5.jpeg",
            is_in_serving: true,
            description: "大胆尝鲜，遇见惊喜",
            title: "新店特惠",
            title_color: ""
          },
          {
            id: 92,
            image_url: "../../static/img/type6.jpeg",
            is_in_serving: true,
            description: "准时必达，超时赔付",
            title: "准时达",
            title_color: ""
          },
          {
            id: 1,
            image_url: "../../static/img/type7.jpeg",
            is_in_serving: true,
            description: "0元早餐0起送，每天都有新花样。",
            title: "预订早餐",
            title_color: ""
          },
          {
            id: 65,
            image_url: "../../static/img/type8.jpeg",
            is_in_serving: true,
            description: "",
            title: "土豪推荐",
            title_color: ""
          }
        ],
        [
          {
            id: 288,
            image_url: "../../static/img/type9.jpeg",
            is_in_serving: true,
            description: "无辣不欢",
            title: "川湘菜",
            title_color: ""
          },
          {
            id: 286,
            image_url: "../../static/img/type10.jpeg",
            is_in_serving: true,
            description: "",
            title: "麻辣烫",
            title_color: ""
          },
          {
            id: 289,
            image_url: "../../static/img/type11.jpeg",
            is_in_serving: true,
            description: "老字号，好味道",
            title: "包子粥店",
            title_color: ""
          },
          {
            id: 9,
            image_url: "../../static/img/type12.jpeg",
            is_in_serving: true,
            description: "内心小公举，一直被宠爱",
            title: "鲜花蛋糕",
            title_color: ""
          },
          {
            id: 285,
            image_url: "../../static/img/type13.jpeg",
            is_in_serving: true,
            description: "寿司定食，泡菜烤肉",
            title: "日韩料理",
            title_color: ""
          },
          {
            id: 8,
            image_url: "../../static/img/type14.jpeg",
            is_in_serving: true,
            description: "一天变女神",
            title: "果蔬生鲜",
            title_color: ""
          },
          {
            id: 236,
            image_url: "../../static/img/type15.jpeg",
            is_in_serving: true,
            description: "大口大口把你吃掉",
            title: "汉堡薯条",
            title_color: ""
          },
          {
            id: 287,
            image_url: "../../static/img/type16.jpeg",
            is_in_serving: true,
            description: "西餐始祖，欧洲的味道",
            title: "披萨意面",
            title_color: ""
          }
        ]
      ]
    };
  },
  mounted() {
    //初始化swiper
    new Swiper(".swiper-container", {
      loop: true,
      pagination: ".swiper-pagination"
    });
  },
  components: {
    headerBar,
    footerBar,
    shopList
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    sortAll() {
      this.sort_all = !this.sort_all;
      // 禁止页面滑动
      if (document.body.style.overflow) {
        document.body.style.overflow =
          document.body.style.overflow == "auto" ? "hidden" : "auto";
        if (document.body.style.overflow == "hidden") {
          this.$nextTick(() => {
            document.documentElement.scrollTop += 450;
          });
        }
      } else {
        document.body.style.overflow = "hidden";
        // 让导航栏跳至最上方
        this.$nextTick(() => {
          document.documentElement.scrollTop += 700;
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: -0.2rem;
    }
  }
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}
.shoplist_title {
  margin-top: 0.3rem;
  @include wh(100%, 1.45rem);
  line-height: 1.45rem;
  background-color: #fff;
  text-align: center;
  @include sc(0.7rem, #000);
  display: block;
  /*
  &:before,&:after{
    content: "";
    display: block;
    width: 1rem;
    height: 0.01rem;
    background-color: #999;
  }
  &:before{
    margin-right: 0.36rem;
  }
  &:after{
    margin-left: 0.36rem;
  }*/
}
.list_nav {
  @include wh(100%, 1.6rem);
  line-height: 1.6rem;
  background-color: #fff;
  text-align: center;
  @include sc(0.56rem, #333);
  display: flex;
  z-index: 5;
  .sort_all {
    span {
      font-weight: 700;
      color: $blue;
    }
    img {
      fill: $blue;
    }
  }
  .list_item {
    flex: 1;
    .list_back_svg {
      @include wh(0.5rem, 0.5rem);
      fill: #333;
    }
  }
}
.filtermodel {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
// .filter-extend{
//   display: none;
// }
.filter-sort {
  display: none;
  background: #fff;
  position: absolute;
  opacity: 1;
  width: 100%;
  border-top: 1px solid #ddd;
  padding: 0.3rem 0;
  left: 0;
  right: 0;
  ul {
    display: block;
    list-style: none;
    li {
      @include sc(0.56rem, #333);
      display: list-item;
      position: relative;
      height: 1.6rem;
      line-height: 1.6rem;
      padding-left: 0.6666rem;
    }
    .select_img {
      @include wh(0.55rem, 0.55rem);
      position: absolute;
      right: 0.373333rem;
      top: 50%;
      display: none;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    // 选中样式
    .active {
      span {
        color: $blue;
        font-weight: 600;
      }
      img {
        display: block;
      }
    }
  }
  &.open {
    display: block;
  }
}
</style>
