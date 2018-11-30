<template>
  <div>
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
                <span class="add_svg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg> 
                </span>
              </div>
              <div class="accept_info">
                <span class="name">靳</span>
                <span class="tel">18232971281</span>
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
                  <div ></div>
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
                    <span>{{item.name}}</span>
                  </div>
                  <span class="num">× {{item.totalnum}}</span>
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
                    <span class="extra_money">￥4</span>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <span class="fengniao">蜂鸟</span>
                    <span class="extra_name extra_delivery">配送费</span>
                  </div>
                  <div class="right">
                    <span class="extra_money">￥4</span>
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
                    <span class="extra_money">￥77</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 其他信息 -->
          <div class="other_info box-section">其他</div>
        </div>
        <!-- 底部 -->
        <div class="footer"></div>
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
      cartinfo: {}
    };
  },
  components: {
    headerBar,
    footerBar
  },
  computed: {
    ...mapState(["userInfo","cartInfo"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.cartinfo = this.cartInfo;
      console.log(this.cartinfo);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/mixin";
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
  padding: 1.95rem 0.2rem 1.9rem;  
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #0085ff, #0af);
}
.top_content{
  // 地址
  .cart_address{
    padding-top: 0.67rem;
    display: flex;
    align-items: center;
    min-height: 4.5rem;
    overflow: hidden;
    &>div{
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      flex: 0 100%;
      overflow: hidden;
    }
    .add_tips{
      color: hsla(0,0%,100%,.8);
    }
    .address{
      height: 1.6rem;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.6rem;
      // overflow: hidden;
      display: flex;
      align-items: center;
      
      span{
        color: #fff;
        max-width: calc(100% - 3rem);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .add_svg{
        display: inline-block;
        @include wh(0.5rem, 0.5rem);
        svg{
          fill: #fff;
          @include wh(100%,100%);
        }
      }
    }
    .accept_info{
      span{
        color: #fff;
      }
    }
  }
}
// 送达时间
.service{
  padding: 0 0.6rem;
  .time{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: .626667rem 0;
    .left{
      flex: 1;
      .delivery-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.67rem;
        font-weight: 500;
        span{
          font-weight: 500;
        }
      }
      .delivery-extra{
        margin-top: 0.2rem;
        font-size: 0.54rem;
        word-spacing: 0.25rem;
        
      }
    }
    .right{
      text-align: right;
      .delivery_time{
        .no-choose-time{
          text-align: right;
          color:#2395ff;
        }
        .right_svg{
          display: inline-block;
          @include wh(0.5rem, 0.5rem);
          svg{
            @include wh(100%, 100%);
          }
        }
      }
    }
  }
  .method{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .626667rem 0;
    .pay-text{
      span{
        text-align: right;
        color: #2395ff;
      }
    }
  }
}
// 商品详情
.cart_info{
  padding: 0 0.6rem;
  .shop_title{
    padding: 0.4rem 0;
    font-size: 0.72rem;
    border-bottom: 1px solid #eee;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    span{
      font-weight: 700;
    }
  }
  .shop_list{
    margin-top: 0.2rem;
    color: #333;
    li{
      display: flex;
      align-items: center;
      width: 100%;
      padding: .5rem 0;
      border-bottom: 1px dotted #eee;
      font-size: .54rem;
      .img{
        @include wh(1.6rem, 1.6rem);
        background-color: #ccc;
      }
      .name{
        margin-left: 0.3rem;
        overflow: hidden;
        flex: 9;
        span{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .num{
        flex: 1;
      }
      .old_pri{
        min-width: 2.2rem;
        color: #bbb;
        font-size: 0.7rem;
        text-align: right;
      }
      .pri{
        flex: 3;
        text-align: right;
        font-size: 0.72rem;
      }
    }
  }
  .extra_list{
    margin-top: 0.2rem;
    color: #333;
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: .5rem 0;
      border-bottom: 1px dotted #eee;
      font-size: .54rem;
      .extra_name{
        padding-left: 0.4rem;
        font-size: 0.54rem;
      }
      .extra_money{
        font-size: 0.72rem;
      }
    }
  }
}

.redStyle{
  color: #ff4a07;
}
.box-section{
  background: #fff;
  box-shadow: 0 0.1333rem 0.34667rem 0 rgba(0,0,0,.05);
  
  &:not(:last-child){
    margin-bottom: 0.4rem;
  }
}
// 蜂鸟图标
.fengniao{
  display: inline-block;
  padding: 0.01rem 0.1rem;
  font-size: 0.34rem;
  background-image: linear-gradient(90deg,#0af,#0085ff);
  color: #fff;
  border-radius: 0.1rem;
}
// 包装
.package{
  display: inline-block;
  padding: 0.01rem 0.1rem;
  color: #8395ae;
  font-size: 0.34rem;
  // border: 1px solid rgba(131,149,174,.34);
  background-color: rgba(149,168,193,.14);
  border-radius: 0.1rem;
}
</style>
