<template>
    <div>
        <!-- <header-bar head-title="我的" goBack="true"></header-bar> -->
        <!-- 商家信息 -->
        <div class="shop_head">
            <div class="header">
                <nav class="header_all" :style="{backgroundImage: 'url('+shopDetailData.image_path+')'}">
                    <a href="javascript:;" class="goback" @click="goback"></a>
                </nav>
                <div class="header_title">
                    <div class="shop_img">
                        <span class="shop_tips mini_tips" >
                            <span>品牌</span>
                        </span>
                        <img :src="shopDetailData.image_path" alt="">
                        <!-- <img src="../../images/coco.jpeg" alt=""> -->
                    </div>
                    <div class="shop_title">
                        <h2 class="tit">
                            <span>{{shopDetailData.name}}</span>
                            <i></i>
                        </h2>
                        <div class="shop_detail">
                            <span class="det_tips">评价{{shopDetailData.rating}}</span>
                            <span class="det_tips">月售{{shopDetailData.recent_order_num}}单</span>
                            <span class="det_tips">蜂鸟快送约{{shopDetailData.order_lead_time}}分钟</span>
                        </div>
                    </div>
                    <div class="shop_discount shop_width"  v-if="shopDetailData.activities">
                        <div class="dis_left">
                            <div>
                                <span class="first_tips mini_tips">
                                    <span>{{shopDetailData.activities[0].icon_name}}</span>
                                </span>
                                <span>{{shopDetailData.activities[0].description}}</span>
                            </div>
                        </div>
                        <div class="dis_right" @click="show_dis">{{shopDetailData.activities.length}}个优惠</div>
                    </div>
                    <p class="shop_info shop_width">
                        公告：{{promotionInfo}}
                    </p>
                </div>

            </div>
            <div class="discount_info" v-if="show_discount">
              <div class="info_box">
                <h2>优惠活动</h2>
                <div class="info_ul">
                  <ul>
                    <li v-for="item in shopDetailData.activities" :key="item.id">
                      <span class="first_tips mini_tips" :style="{backgroundColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                      <span>{{item.description}}</span>
                    </li>
                  </ul>
                </div>
                <div class="info_close" @click="show_discount = false">
                  <svg width="100%" height="100%" class="close_activities">
                    <line x1="0" y1="20" x2="20" y2="0" style="stroke:#999;stroke-width:2"/>
                    <line x1="0" y1="0" x2="20" y2="20" style="stroke:#999;stroke-width:2"/>
                  </svg>
                </div>
              </div>
              <div class="info_filter" @click="show_discount = false"></div>
            </div>
        </div>
        <!-- 头部导航 -->
        <div class="shop_tab" style="position: sticky; top: 0; z-index: 55;">
            <div class="tab_item">
              <p class="tab_tit">点餐
                <span class="bot_line"></span>
              </p>
              </div>
            <div class="tab_item">
              <p>评价
                <span></span>
              </p>
              </div>
            <div class="tab_item">
              <p>商家
                <span></span>
              </p>
              </div>
        </div>
        <!-- 左右菜单 -->
        <div class="order" style="display:none;">
          <div class="menu_left">
            <ul>
              <li v-for="(item, key) in menuList" :key="key">{{item.name}}</li>
            </ul>
          </div>
          <div class="menu_right">
            <div class="menu">
              <dl v-for="item in menuList" :key="item.id">
                <dt>
                  <div class="menu_des">
                    <strong>{{item.name}}</strong>
                    <span>{{item.description}}</span>
                  </div>
                </dt>
                <dd v-for="item in item.foods" :key="item.id">
                  <div class="food_root">
                    <span class="food_img">
                      <!-- img -->
                      <img src="../../images/naicha.jpeg" alt="">
                    </span>
                    <div class="food_detail">
                      <p class="food_name">
                        <span class="nameText">{{item.name}}</span>
                      </p>
                      <p class="food_desc">{{item.description}}</p>
                      <p class="food_sales"><span>月售{{item.month_sales}}份</span><span>好评{{item.satisfy_rate}}%</span></p>
                      <p class="food_discount"></p>
                      <span class="food_pri">
                        <span>{{item.specfoods[0].price}}</span>
                        <del v-if="item.specfoods[0].original_price">￥{{item.specfoods[0].original_price}}</del>
                      </span>
                      <div class="food_add">
                        <span>
                          <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                          </svg>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <!-- 购物车 -->
          <div class="cart">
            <div class="shopcart">
              <div class="cart_left nofoods">
                <div class="cart_icon">
                </div>
              </div>
              <div class="cart_middle foods_pri">
                <p class="foods_price">
                  <span class="foods_total" v-if="totalPrice">{{totalPrice}}</span>
                  <span class="no_food middle_font" v-else>未选购商品</span>
                </p>
                <p class="food_deliver middle_font">另需配送费{{deliveryFee}}元</p>
              </div>
              <a role="button" href="javascript:;" class="cart_right ">

                <span class="total_pri">￥{{minimumOrderAmount}}起送</span>
              </a>
            </div>
          </div>
        </div>
        <!-- 评价 -->
        <div class="evaluate">
          <div class="shop_rating">

          </div>
          <div class="shop_eval">

          </div>
        </div>
        <!-- 商家 -->


    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";

export default {
  data() {
    return {
      show_discount: false,
      menuList: [], //食品列表
      shopDetailData: {}, //商铺详情
      totalNum: 0, //总个数
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false //显示购物车列表

      // geohash:'',
      // shopId: null,//商店id
      // showLoading: true, // 显示加载动画
      // changeShowType: 'food', //切换显示页面
    };
  },
  components: {
    headerBar,
    footerBar
  },
  mounted() {
    this.initData();
  },
  computed: {
    // 公告
    promotionInfo: function() {
      return (
        this.shopDetailData.promotion_info || "欢迎光临，用餐高峰期请提前下单，谢谢。"
      );
    },
    // 配送费
    deliveryFee: function() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee;
      } else {
        return null;
      }
    },
    // 起送价
    minimumOrderAmount: function() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount;
      } else {
        return null;
      }
    }
  },
  methods: {
    initData() {
      this.$axios.get("/static/json/shop.json/").then(res => {
        // console.log(res.data);
        // console.log(res.data.rst);
        this.menuList = res.data.menu;
        this.shopDetailData = res.data.rst;
      });
    },
    // totalNum(){},
    goback() {
      this.$router.go(-1);
    },
    show_dis() {
      this.show_discount = true;
    }
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";

.shop_head {
  position: relative;
  .header {
    @include sc(0.54rem, #333);
    background-color: #fff;
    padding-top: 4.3333rem;
    .header_all {
      background-image: url("../../images/header.png");
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      height: 4.3333rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      display: flex;
      padding: 0.3rem 0.4rem 0;
      align-items: justify;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        background-image: linear-gradient(
          0deg,
          hsla(0, 0%, 100%, 0),
          rgba(0, 0, 0, 0.5)
        );
      }
    }
    .header_title {
      position: relative;
      padding-top: 1.78rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      .shop_img {
        position: absolute;
        @include wh(3.7888rem, 3.78888rem);
        top: 0;
        margin-top: -2.555rem;
        z-index: 78;

        & > img {
          @include wh(100%, 100%);
          border-radius: 0.17rem;
          box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
        }
      }
      .shop_title {
        flex: 1;
        width: 12rem;
        .tit {
          font-size: 0.89rem;
          white-space: nowrap;
          position: relative;
          padding-right: 0.3rem;
          @include fj(center);
          align-items: center;
          span {
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i {
            position: relative;
            @include wh(0.68rem, 0.5222rem);
            margin-left: 0.2rem;
            &:after {
              content: "";
              position: absolute;
              border-style: solid;
              border-width: 0.2666rem 0 0.2666rem 0.34rem;
              border-color: transparent transparent transparent
                rgba(0, 0, 0, 0.67);
            }
          }
        }
        .shop_detail {
          text-align: center;
          white-space: nowrap;
          height: 0.8rem;
          margin-top: 0.3rem;
          color: #666;
          span:not(:last-child)::after {
            content: " \B7 ";
            opacity: 0.2;
          }
        }
      }
      .shop_discount {
        @include fj(center);
        margin: 0.344rem auto 0;
        color: #333;
        .dis_left {
          flex: 1;
          overflow: hidden;
          & > div {
            align-items: center;
          }
        }
        .dis_right {
          color: #999;
          position: relative;
          width: 2.422rem;
          &::after {
            position: absolute;
            content: "";
            display: block;
            border-style: solid;
            margin-left: 0.2rem;
            border-width: 0.24rem 0.1666rem 0 0.1666rem;
            border-color: #999 transparent transparent transparent;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
          }
        }
      }
      .shop_info {
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0.326667rem auto 0.366667rem;
        padding: 0;
        white-space: nowrap;
      }
    }
  }
  .discount_info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .info_box {
      position: absolute;
      background-color: #f5f5f5;
      box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
      z-index: 100;
      bottom: 0;
      @include wh(100%, 10.8888rem);
      box-sizing: border-box;
      padding: 0.7rem 1.1rem;
      font-size: 0.55rem;
      h2 {
        font-size: 0.788rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 0.34rem;
      }
      .info_ul {
        height: 7.8rem;
        overflow: scroll;
        ul > li {
          margin-bottom: 0.45rem;
        }
      }
      .info_close {
        position: absolute;
        @include wh(1.3rem, 1.3rem);
        right: 0.2rem;
        top: 0.32rem;
      }
    }
    .info_filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
.shop_tab {
  display: flex;
  @include wh(100%, 2rem);
  background: #fff;
  line-height: 2rem;
  font-size: 0.74rem;
  // font-size: 700;
  & > .tab_item {
    flex: 1;
    text-align: center;
    position: relative;
    color: #666;
    border-bottom: 1px solid #ebebeb;
    // 选中下划线样式
    .tab_tit {
      display: inline-block;
      position: relative;
      span {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.111rem;
        background-color: #2395ff;
      }
    }
  }
}
.order {
  padding-bottom: 2.5rem;
  display: flex;
  height: 100%;
  .menu_left {
    // flex: 1;
    overflow-y: auto;
    @include wh(3.5rem, 100%);
    // min-width: 3.4333rem;
    background-color: #f8f8f8;
    overflow: scroll;
    ul {
      position: relative;
      flex: none;
      z-index: 0;
      li {
        position: relative;
        padding: 0.75rem 0.35rem;
        font-size: 0.56rem;
        color: #666;
      }
    }
  }
  .menu_right {
    position: relative;
    height: 100%;
    // width: 12.4rem;
    flex: 1;
    background: #fff;
  }
}
.evaluate{
  padding-bottom: 2.5rem;
  height: 100%;
  .shop_rating{
    @include wh(100%, 4.3rem);
    background-color: #fff;
    margin-bottom: 0.4rem;
  }
  .shop_eval{
    background-color: #fff;
    padding: 3rem 4rem 0;
    font-size: 0.5rem;
  }
}
.menu {
  height: 100%;
  overflow-y: auto;
  dl > dt {
    position: relative;
    margin-left: 0.2rem;
    padding: 0.2rem 0.3rem;
    .menu_des {
      display: flex;
      align-items: center;
      overflow: hidden;
      strong {
        font-weight: 700;
        font-size: 0.54rem;
        color: #666;
        flex: none;
        margin-right: 0.4rem;
      }
      span {
        flex: 1;
        color: #999;
        font-size: 0.266667rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  dl > dd {
    position: relative;
    margin: 0;
    min-height: 4.3rem;
    padding-left: 0.5rem;
    & > div {
      padding: 0.3rem 0;
      margin-bottom: 0.02rem;
      display: flex;
      position: relative;
      min-height: 4.3rem;
    }
    .food_img {
      @include wh(4.3rem, 4.3rem);
      flex: none;
      position: relative;
      margin-right: 0.3rem;
      img {
        @include wh(100%, 100%);
      }
    }
    .food_detail {
      flex: 1;
      position: relative;
      padding-bottom: 1.2rem;
      padding-right: 0.7999rem;
      .food_name {
        position: relative;
        padding-right: 0.5rem;
        display: flex;
        align-items: start;
        .nameText {
          font-size: 0.7rem;
          font-weight: 700;
          overflow: hidden;
          width: 6.5rem;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .food_desc {
        margin: 0.1rem 0;
        font-size: 0.5rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 7.2rem;
      }
      .food_sales {
        width: 7rem;
        font-size: 0.5rem;
        color: #999;
        span {
          vertical-align: middle;
        }
        & > span:not(:first-child) {
          margin-left: 0.2rem;
        }
      }
      .food_pri {
        position: absolute;
        bottom: 0;
        font-size: 0.65rem;
        width: 4.3rem;

        span {
          color: rgb(255, 83, 57);
        }
        &:before {
          content: "￥";
          color: rgb(255, 83, 57);
        }
        del {
          font-size: 0.5rem;
          color: #999;
          margin-left: 0.04rem;
        }
      }
      .food_add {
        position: absolute;
        right: 0.9rem;
        bottom: 0;
        @include wh(0.9rem, 0.9rem);
        display: flex;
        span {
          &.select_num {
            font-size: 0.67rem;
            line-height: 0.9rem;
            color: #666;
            vertical-align: middle;
          }
        }
        svg {
          @include wh(100%, 100%);
          fill: #2395ff;
        }
      }
    }
  }
}
.cart {
  font-size: 0.5rem;
  @include wh(100%, 2.3rem);
  background: #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  .shopcart {
    @include wh(100%, 2.3rem);
    display: flex;
    align-items: center;
    padding-left: 3.7rem;
    background-color: rgba(61, 61, 63, 0.9);
    .cart_left {
      position: absolute;
      @include wh(2.4rem, 2.4rem);
      left: 0.4rem;
      bottom: 0.244rem;
      box-sizing: border-box;
      border-radius: 100%;
      background-color: #3190e8;
      border: 0.2rem solid #444;
      box-shadow: 0 -0.1rem 0.133333rem 0 rgba(0, 0, 0, 0.1);
      will-change: transform;
      &.nofoods {
        background-image: radial-gradient(circle, #363636 6.266667rem, #444 0);
      }
      &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url(../../images/cart.svg) 50% no-repeat;
        background-size: 0.6rem;
        background-size: 6vw;
        content: "";
      }
    }
    .cart_middle {
      flex: 1;
      .foods_total {
        font-size: 0.75rem;
        color: #fff;
      }
    }
    .cart_right {
      background-color: #535356;
      @include wh(5rem, 100%);
      text-decoration: none;
      text-align: center;
      line-height: 2.3rem;
      span {
        font-size: 0.7rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }
}
.middle_font {
  font-size: 0.7em;
  color: #999;
}
.shop_width {
  width: 12.455rem;
  font-size: 0.4555rem;
}
.goback {
  display: inline-block;
  margin: 0.33rem 0 0 0.3rem;
  @include wh(0.5688rem, 0.5688rem);
  z-index: 5;
  border-left: 0.07rem solid #fff;
  border-bottom: 0.07rem solid #fff;
  transform: rotate(45deg);
}
.shop_tips {
  position: absolute !important;
  top: 0;
  left: 0;
  border-radius: 0.17rem;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  @include wh(1rem, 0.7rem);
}
.first_tips {
  display: inline-block;
  border-radius: 0.1rem;
  background-color: rgb(112, 188, 70);
  @include wh(1rem, 0.6rem);
  span {
    @include sc(0.3334rem, #fff);
  }
}
.mini_tips {
  position: relative;
  font-size: 0.3333rem;
  color: #fff;
  white-space: nowrap;
}
// .shop_menu{
//     position: relative;
//     padding-top: 2rem;
// }
</style>
