<template>
  <div>
    <!-- <div class="cover"></div> -->
    <header-bar head-title="确认订单" goBack="true"></header-bar>

    <div class="cart-outer viewbody">
      <div>
        <div class="top_content">
          <!-- 地址 电话 -->
          <div class="cart_address">
            <div>
              <span class="add_tips">订单配送至</span>
              <div class="address">
                <span>仁和立大厦</span>
                <svg fill="#fff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </div>
              <div class="accept_info">
                <span class="name">{{username}}</span>
                <span class="tel">{{userphone}}</span>
              </div>
            </div>
          </div>
          <!-- 送达时间支付方式 -->
          <div class="service box-section">
            <div>
              <div class="time">
                <div class="left">
                  <div class="delivery-title">
                    <span>送达时间</span>
                  </div>
                  <div class="delivery-extra">
                    <span class="shangjia" style="display:none;">商家派送</span>
                    <span class="fengniao">蜂鸟专送</span>
                  </div>
                </div>
                <div class="right">
                  <!-- 选择送达时间 -->
                  <div></div>
                  <div class="delivery_time">
                    <span class="no-choose-time">尽快送达</span>
                    <span class="right_svg">
                      <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="method">
                <span>支付方式</span>
                <div class="pay-text">
                  <span>在线支付</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 购物车商品 -->
          <div class="cart_info box-section">
            <div>
              <h3 class="shop_title">
                <span>{{cartinfo.shopname}}</span>
              </h3>
              <!-- 商品列表 -->
              <ul class="shop_list">
                <li v-for="(item, key) in cartinfo.cartFood" :key="key">
                  <span class="img"></span>
                  <div class="name">
                    <p>{{item.name}}</p>
                  </div>
                  <span class="num">×{{item.totalnum}}</span>
                  <span class="old_pri">
                    <del v-if="item.old_pri">￥{{item.old_pri}}</del>
                  </span>
                  <span class="pri" :class='{"redStyle": item.old_pri}'>￥{{item.food_pri}}</span>
                </li>
              </ul>
              <!-- 其他费用 -->
              <ul class="extra_list">
                <li>
                  <div class="left">
                    <span class="package">包装</span>
                    <span class="extra_name extra_pack">餐盒</span>
                  </div>
                  <div class="right">
                    <span class="extra_money">￥{{cartinfo.totalPacking}}</span>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <span class="fengniao">蜂鸟</span>
                    <span class="extra_name extra_delivery">配送费</span>
                  </div>
                  <div class="right">
                    <span class="extra_money">￥{{cartinfo.delifee}}</span>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <span>满减活动与单品不同享</span>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <span>红包</span>
                  </div>
                  <div class="right">
                    <!-- <span class="extra_money"></span> -->
                  </div>
                </li>
                <li>
                  <div class="left">
                    <span>优惠说明</span>
                  </div>
                  <div class="right">
                    <span>小计</span>
                    <span class="extra_money">￥{{totalPri}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 其他信息 -->
          <div class="other_info box-section">
            <div>
              <a href="#" class="remarks info_items">
                <span>订单备注</span>
                <span class="right_tips">
                  <span>口味偏好</span>
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </a>
              <div class="invoice info_items">
                <span>发票信息</span>
                <span class="right_tips">
                  <span>不需要开发票</span>
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div>
            <span class="total-money">￥{{totalPri}}</span>
            <span
              class="discount"
              v-if="cartinfo.originalPrice - cartinfo.totalPrice"
            >| 已优惠￥{{cartinfo.originalPrice - cartinfo.totalPrice}}</span>
            <button class="payment" @click="topay">去支付</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <footer-bar></footer-bar> -->
  </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import { mapState } from "vuex";

export default {
  data() {
    return {
      cartinfo: {},
      username: null,
      userphpne:null,
      // topay: false,
    };
  },
  components: {
    headerBar,
    footerBar
  },
  computed: {
    ...mapState(["userInfo", "cartInfo"]),
    totalPri: function() {
      return this.cartinfo.totalPrice + this.cartinfo.delifee;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.cartinfo = this.cartInfo;
      console.log(this.cartinfo);

      this.username = this.userInfo.username;
      this.userphone = this.userInfo.phone;
    },
    topay(){
      alert("请在手机上进行支付")
    },
  }
};
</script>

<style lang="scss">
@import "../../style/mixin";
.cover{
  display: none;
  position: fixed;
  @include wh(100%, 100%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 101;
}
.viewbody {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 0.65rem;
}
.cart-outer {
  position: relative;
  background: #fff;
  padding: 1.95rem 0.2rem 2.3rem;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #0085ff, #0af);
}
// 地址
.cart_address {
  padding-top: 0.67rem;
  display: flex;
  align-items: center;
  min-height: 4.5rem;
  overflow: hidden;
  & > div {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    flex: 0 100%;
    overflow: hidden;
  }
  .add_tips {
    color: hsla(0, 0%, 100%, 0.8);
  }
  .address {
    height: 1.6rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.6rem;
    // overflow: hidden;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      max-width: calc(100% - 3rem);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    svg {
      padding-left: 0.3rem;
      fill: #fff;
      @include wh(0.4rem, 0.4rem);
    }
  }
  .accept_info {
    font-size: 0.6rem;
    span {
      color: #fff;
    }
  }
}
// 送达时间
.service {
  padding: 0 0.6rem;
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 0.626667rem 0;
    .left {
      flex: 1;
      .delivery-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.67rem;
        font-weight: 500;
        span {
          font-weight: 500;
        }
      }
      .delivery-extra {
        margin-top: 0.2rem;
        font-size: 0.54rem;
        word-spacing: 0.25rem;
      }
    }
    .right {
      text-align: right;
      .delivery_time {
        .no-choose-time {
          text-align: right;
          color: #2395ff;
        }
        .right_svg {
          display: inline-block;
          @include wh(0.5rem, 0.5rem);
          svg {
            @include wh(100%, 100%);
          }
        }
      }
    }
  }
  .method {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.626667rem 0;
    .pay-text {
      span {
        text-align: right;
        color: #2395ff;
      }
    }
  }
}
// 商品详情
.cart_info {
  padding: 0 0.6rem;
  .shop_title {
    padding: 0.4rem 0;
    font-size: 0.72rem;
    border-bottom: 1px solid #eee;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    span {
      font-weight: 700;
    }
  }
  .shop_list {
    margin-top: 0.2rem;
    color: #333;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.5rem 0;
      border-bottom: 1px dotted #eee;
      font-size: 0.54rem;
      .img {
        @include wh(1.6rem, 1.6rem);
        background-color: #ccc;
      }
      .name {
        margin-left: 0.3rem;
        overflow: hidden;
        flex: 9;
        p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .num {
        flex: 1;
      }
      .old_pri {
        min-width: 2.2rem;
        color: #bbb;
        font-size: 0.7rem;
        text-align: right;
      }
      .pri {
        flex: 3;
        text-align: right;
        font-size: 0.72rem;
      }
    }
  }
  .extra_list {
    margin-top: 0.2rem;
    color: #333;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem 0;
      border-bottom: 1px dotted #eee;
      font-size: 0.54rem;
      .extra_name {
        padding-left: 0.4rem;
        font-size: 0.54rem;
      }
      .extra_money {
        font-size: 0.72rem;
      }
    }
  }
}
.redStyle {
  color: #ff4a07;
}
.box-section {
  background: #fff;
  box-shadow: 0 0.1333rem 0.34667rem 0 rgba(0, 0, 0, 0.05);

  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }
}
//其他
.other_info {
  padding: 0 0.6rem;
  font-size: 0.54rem;
  a {
    display: block;
  }
  .info_items {
    padding: 0.7rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right_tips {
      display: flex;
      align-items: center;
      span:first-child {
        color: #bbb;
      }
      svg {
        padding-left: 0.2rem;
        @include wh(0.55rem, 0.55rem);
      }
    }
  }
}
//底部
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  @include wh(100%, 1.9rem);
  background-color: #3c3c3c;
  span {
    color: #fff;
    line-height: 1.9rem;
  }
  .total-money {
    padding-left: 0.4rem;
    font-size: 0.78rem;
  }
  .discount {
    padding-left: 0.2rem;
    font-size: 0.45rem;
    color: #999;
  }
  button {
    // display: inline-block;
    @include wh(3.7rem, 100%);
    padding: 0 0.1rem;
    background-color: #00e067;
    font-size: 0.75rem;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }
  
}
// .topay{
//   // display: none;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate3d(-50%,-50%,0);
//   z-index: 111;
//   background: #2395ff;
//   padding: 1rem;
//   font-size: 0.65rem;
// }
// 蜂鸟图标
.fengniao {
  display: inline-block;
  padding: 0.01rem 0.1rem;
  font-size: 0.34rem;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  color: #fff;
  border-radius: 0.1rem;
}
// 包装
.package {
  display: inline-block;
  padding: 0.01rem 0.1rem;
  color: #8395ae;
  font-size: 0.34rem;
  // border: 1px solid rgba(131,149,174,.34);
  background-color: rgba(149, 168, 193, 0.14);
  border-radius: 0.1rem;
}
</style>
