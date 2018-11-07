<template>
    <div class="shoplist_container">
        <ul v-if="shopArr.length">
            <router-link to="shop" v-for="item in shopArr" tag='li' :key="item.id" class="shop_li">
                <!-- 店图片 -->
                <section>
                    <!-- <img src="../../images/1.png" alt="" class="shop_img"> -->
                    <img :src="item.image_path" alt="" class="shop_img">
                </section>
                <hgroup class="shop_right">
                    <header class="shop_detail_header">
                        <h4 :class="item.is_premium? 'premiun':''" class="shop_title ellipsos">
                            {{item.name}}
                        </h4>
                        <ul class="shop_detail_ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="rating_order_num">
                        <section class="rating_order_num_left">
                            <section class="rating_section">
                                <!-- 星级 -->
                                <!-- <span class="star">☆☆☆☆☆</span> -->
                                <rating-star :rating='item.rating'></rating-star>
                                <span class="rating_num"> {{item.rating}} </span>
                            </section>
                            <section class="order_section">
                                月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating_order_num_right">
                            <!-- 送餐方式、准时达 -->
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode"> {{item.delivery_mode.text}} </span>
                            <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
                            ￥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation">|</span>
                            {{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance_time">
                            <span v-if="Number(item.distance)">{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm' }} >
                                <span class="segmentation">|</span>                                
                            </span>
                            <span v-else>{{item.distance}}</span>
                            <span class="segmentation">|</span>
                            <span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
        </ul>

        <!-- 返回顶部 -->
        <!-- <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside> -->
    </div>
</template>
<script>
import ratingStar from "./ratingStar";
export default {
  data() {
    return {
      offset: 0, // 批次加载店铺列表
      preventRepeatReuquest: false, //到达底部加载数据，防止重复加载
      showBackStatus: false, //显示返回顶部的按钮
      showLoading: true, //显示加载动画
      touchend: false, //没有更多数据
      zhunStatus: null,
      shopArr: []
    };
  },
  components: {
    ratingStar
  },
  mounted() {
    this.$axios.get("/static/json/shoplist.json").then(res => {
      this.shopArr = res.data;
    });
  },
  methods: {
    // 判断“准时达”
    zhunshi(supports) {
      let zhunStatus;
      if (supports instanceof Array && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === "准") {
            zhunStatus = true;
          }
        });
      } else {
        zhunStatus = false;
      }
      return zhunStatus;
    }
    // backTop() {
    //     animate(document.body, {scrollTop: '0'});
    // }
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";

.shoplist_container {
  margin-top: 0.01rem;
  background: #fff;
  margin-bottom: 1.95rem;
}
.shop_li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}
.shop_img {
  @include wh(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
}
.shop_right {
  flex: auto;
  .shop_detail_header {
    @include fj;
    align-items: center;
    .shop_title {
      width: 9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; //单行超出显示省略号
      color: #333;
      padding-top: 0.01rem;
      @include font(0.65rem, 0.65rem, "PingFangSC-Regular");
      font-weight: 700;
    }
    .premiun::before {
      content: "品牌";
      display: inline-block;
      font-size: 0.5rem;
      line-height: 0.6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.2rem;
    }
    .shop_detail_ul {
      display: flex;
      transform: scale(0.8);
      margin-right: -0.2rem;
      .supports {
        @include sc(0.5rem, #999);
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
  .rating_order_num {
    @include fj(space-between);
    height: 0.6rem;
    margin-top: 0.52rem;
    .rating_order_num_left {
      @include fj(flex-start);
      .rating_section {
        display: flex;
        // height: 1rem;
        // line-height: 1rem;
        .star {
          @include sc(0.4rem, #ff6000);
          margin: 0 0.2rem;
        }
        .rating_num {
          @include sc(0.4rem, #ff6000);
          margin: 0 0.2rem;
        }
      }
      .order_section {
        transform: scale(0.8);
        margin-left: -0.2rem;
        @include sc(0.4rem, #666);
      }
    }
    .rating_order_num_right {
      display: flex;
      align-items: center;
      transform: scale(0.7);
      min-width: 5rem;
      justify-content: flex-end;
      margin-right: -0.8rem;
      .delivery_style {
        font-size: 0.6rem;
        padding: 0.04rem 0.08rem 0;
        border-radius: 0.08rem;
        margin-left: 0.08rem;
        border: 1px;
      }
      .delivery_left {
        color: #fff;
        background-color: $blue;
        border: 0.025rem solid $blue;
      }
      .delivery_right {
        color: $blue;
        border: 0.025rem solid $blue;
      }
    }
  }
  .fee_distance {
    margin-top: 0.52rem;
    @include fj;
    @include sc(0.54rem, #333);
    .fee {
      transform: scale(0.9);
      @include sc(0.57rem, #666);
    }
    .distance_time {
      transform: scale(0.9);
      span {
        color: #999;
      }
      //   .order_time{
      //       color: $blue;
      //   }
      .segmentation {
        color: #ccc;
      }
    }
  }
}
</style>
