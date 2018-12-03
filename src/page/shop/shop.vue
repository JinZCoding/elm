<template>
  <div class="outer" @scroll="handleScroll()">
    <!-- <header-bar head-title="我的" goBack="true"></header-bar> -->
    <!-- 商家信息 -->
    <div class="shop_head" id="shop_head">
      <div class="header">
        <nav class="header_all" :style="{backgroundImage: 'url('+shopDetailData.image_path+')'}">
          <a href="javascript:;" class="goback" @click="goback"></a>
        </nav>
        <div class="header_title">
          <div class="shop_img">
            <span class="shop_tips mini_tips">
              <span>品牌</span>
            </span>
            <img :src="shopDetailData.image_path" alt>
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
          <div class="shop_discount shop_width" v-if="shopDetailData.activities">
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
          <p class="shop_info shop_width">公告：{{promotionInfo}}</p>
        </div>
      </div>
      <div class="discount_info" v-if="show_discount">
        <div class="info_box">
          <h2>优惠活动</h2>
          <div class="info_ul">
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span
                  class="first_tips mini_tips"
                  :style="{backgroundColor: '#' + item.icon_color}"
                >{{item.icon_name}}</span>
                <span>{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="info_close" @click="show_dis()">
            <svg width="100%" height="100%" class="close_activities">
              <line x1="0" y1="20" x2="20" y2="0" style="stroke:#999;stroke-width:2"></line>
              <line x1="0" y1="0" x2="20" y2="20" style="stroke:#999;stroke-width:2"></line>
            </svg>
          </div>
        </div>
        <div :class="{info_filter: show_discount}" @click="show_dis()"></div>
      </div>
    </div>
    <!-- 头部导航 -->
    <div class="shop_tab" id="shop_tab">
      <div class="tab_item" @click="showType='order'">
        <p class="tab_tit" :class="{activites_show: showType=='order'}">点餐</p>
      </div>
      <div class="tab_item" @click="getEval()">
        <p class="tab_tit" :class="{activites_show: showType=='evaluate'}">评价</p>
      </div>
      <div class="tab_item" @click="showType='information'">
        <p class="tab_tit" :class="{activites_show: showType=='information'}">商家</p>
      </div>
    </div>
    <!-- 左右菜单 -->
    <div class="order" id="order" v-show="showType == 'order'">
      <div class="foodlist_cover" @click="hideCover"></div>

      <div class="menu_left" id="menu_left">
        <ul>
          <li
            v-for="(item, key) in menuList"
            :key="key"
            @click="changeMenu(key)"
            :class="{'menu_active': key==menuIndex}"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="menu_right" id="menu_right">
        <div class="menu">
          <dl v-for="(item, key) in menuList" :key="key">
            <dt>
              <div class="menu_des">
                <strong>{{item.name}}</strong>
                <span>{{item.description}}</span>
              </div>
            </dt>
            <dd v-for="(item, key) in item.foods" :key="key">
              <div class="food_root">
                <span class="food_img">
                  <!-- img -->
                  <img src="../../images/naicha.jpeg" alt>
                </span>
                <div class="food_detail">
                  <p class="food_name">
                    <span class="nameText">{{item.name}}</span>
                  </p>
                  <p class="food_desc">{{item.description}}</p>
                  <p class="food_sales">
                    <span>月售{{item.month_sales}}份</span>
                    <span>好评{{item.satisfy_rate}}%</span>
                  </p>
                  <p class="food_discount"></p>
                  <span class="food_pri">
                    <span>{{item.specfoods[0].price}}</span>
                    <del
                      v-if="item.specfoods[0].original_price"
                    >￥{{item.specfoods[0].original_price}}</del>
                  </span>
                  <div
                    class="food_add"
                    @click="addFood(item.item_id,item.name,item.specfoods[0].packing_fee,item.specfoods[0].price,item.specfoods[0].original_price)"
                  >
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
          <div class="cart_left nofoods" @click="showCart">
            <div class="cart_icon" v-if="totalNum">{{totalNum}}</div>
          </div>
          <div class="cart_middle foods_pri" @click="showCart">
            <p class="foods_price">
              <span class="foods_total" v-if="totalPrice">
                <span>￥{{totalPrice+totalPacking}}</span>
                <del v-if="originalPrice!=totalPrice">￥{{originalPrice+totalPacking}}</del>
              </span>
              <span class="no_food middle_font" v-else>未选购商品</span>
            </p>
            <p class="food_deliver middle_font">另需配送费{{deliveryFee}}元</p>
          </div>
          <a role="button" href="javascript:;" class="cart_right">
            <span class="total_pri" v-if="!totalPrice">￥{{minimumOrderAmount}}起送</span>
            <span
              v-else-if="totalPrice && minimumOrderAmount - totalPrice > 0"
            >还差{{minimumOrderAmount - totalPrice}}起送</span>
            <span class="total_pri" v-else @click="settlement">去结算</span>
          </a>
        </div>
        <div class="catr_info" style="display:none">
          <div class="sub_pri" v-if="originalPrice-totalPrice">已减{{originalPrice-totalPrice}}元</div>
          <div class="top">
            <span>已选商品</span>
            <span class="clear" @click="clear">
              <span class="cart_remove">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                </svg>
              </span>
              <span>清空</span>
            </span>
          </div>
          <ul class="food_list">
            <li v-for="(item, key) in cartFood" :key="key">
              <span class="foods_name">{{item.name}}</span>
              <span class="foodpri">
                <del class="old" v-if="item.old_pri">￥{{item.old_pri}}</del>
                <span>￥{{item.food_pri}}</span>
              </span>
              <span class="food_num">
                <span>
                  <a class="svg_icon svg_minus" @click="cartChange(0,key)">
                    <svg>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                  </a>
                  <span class="total_num">{{item.totalnum}}</span>
                  <a class="svg_icon svg_add" @click="cartChange(1,key)">
                    <svg>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                    </svg>
                  </a>
                </span>
              </span>
            </li>
            <li>
              <span class="foods_name">餐盒</span>
              <span>
                <span>{{totalPacking}}</span>
              </span>
              <span class="food_num">
                <span class="total_num"></span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 评价 -->
    <div class="evaluate" v-show="showType == 'evaluate'">
      <div class="shop_rating">
        <div class="rating_left">
          <div class="rating_num">
            <p>{{Number(shop_rating.overall_score).toFixed(1)}}</p>
          </div>
          <div class="rating_star">
            <span>商家评价</span>
            <rating-star :rating="Number(shop_rating.overall_score).toFixed(1)"></rating-star>
          </div>
        </div>
        <div class="rating_right">
          <div class="l_rat rat">
            <div>
              <span>味道</span>
              <p>{{Number(shop_rating.taste_score).toFixed(1)}}</p>
            </div>
            <div>
              <span>包装</span>
              <p>{{Number(shop_rating.package_score).toFixed(1)}}</p>
            </div>
          </div>
          <div class="r_rat rat">
            <div>
              <span>配送</span>
              <p>{{Number(shop_rating.rider_score).toFixed(1)}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="shop_eval">
        <!-- 评价分类标签 -->
        <ul class="rating_ul">
          <li
            @click="show_tag=key"
            :class="{'nothappy': item.unsatisfied, 'show_tag':(key === show_tag && !item.unsatisfied), 'show_tag_nothappy':(key === show_tag && item.unsatisfied)}"
            class="rating_tags"
            v-for="(item,key) in eval_tags"
            :key="key"
          >{{item.name}} {{item.count}}</li>
        </ul>
        <ul>
          <li class="eval_li" v-for="(item, key) in comments" :key="key">
            <div class="eval_info">
              <div class="pic" style="width:2rem; height:2rem">
                <img src alt>
              </div>
              <div class="content">
                <div class="contene_name">
                  <h3>{{item.username}}</h3>
                  <span>{{item.rated_at}}</span>
                </div>
                <div class="contene_rating">
                  <rating-star :rating="item.rating"></rating-star>
                  <span :style="{color: rating_color(item.rating)}">超赞</span>
                </div>
                <div class="content_com">{{item.rating_text}}</div>
                <div class="content_reply" v-if="item.reply">{{item.reply.content}}</div>
                <ul class="content_img" v-if="item.order_images">
                  <li>
                    <img src alt>
                  </li>
                </ul>
                <ul class="content_fav" v-if="item.food_ratings">
                  <span>ヾ(◍°∇°◍)ﾉﾞ</span>
                  <li
                    class="good_food"
                    v-for="(item, key) in item.food_ratings"
                    :key="key"
                  >{{item.rate_name}}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 商家 -->
    <div class="information" v-show="showType == 'information'">
      <div class="delivery_info">
        <h3>配送信息</h3>
        <span class="first_tips mini_tips fn_tips">
          <span>{{delivery_type.text}}</span>
        </span>
        <span
          class="consume"
        >约{{shopDetailData.order_lead_time}}分钟送达，距离{{(shopDetailData.distance/1000).toFixed(1)}}km</span>
        <span class="deli_fee">配送费￥{{shopDetailData.float_delivery_fee}}</span>
      </div>
      <div class="activities_info">
        <h3>活动与服务</h3>

        <ul>
          <li v-for="(item, key) in shopDetailData.activities" :key="key">
            <span class="first_tips mini_tips fn_tips">
              <span>{{item.icon_name}}</span>
            </span>
            <span class="act_info">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>商家实景</h3>
      </div>
      <div class="shop_information">
        <h3>商家信息</h3>
        <span>{{shopDetailData.description}}</span>
        <ul class="info_list">
          <li>
            <h4>品类</h4>
            <!-- <span>{{shopDetailData.flavors[0].name}}</span> -->
          </li>
          <li>
            <h4>商家电话</h4>
            <span>{{shopDetailData.phone}}</span>
          </li>
          <li>
            <h4>地址</h4>
            <span>{{shopDetailData.address}}</span>
          </li>
          <li>
            <h4>营业时间</h4>
            <span>{{shopDetailData.opening_hours}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import ratingStar from "../../components/common/ratingStar";
import { mapState } from "vuex";

export default {
  data() {
    return {
      show_discount: false,
      showType: "order", //默认显示商品列表页面
      menuIndex: 0, //选择分类默认第一个
      menuList: [], //食品列表
      shopDetailData: {}, //商铺详情
      delivery_type: {}, //配送信息
      shop_rating: {}, //评分
      eval_tags: {}, //评价分类
      show_tag: 0, //默认显示全部评价
      comments: [], //评价
      cartFood: [], //购物车商品
      totalPacking: 0, //总餐盒费
      totalNum: 0, //总个数
      totalPrice: 0, //总共价格
      originalPrice: 0, //原价
      showCartList: false, //显示购物车列表
      cartList: {}
      // geohash:'',
      // shopId: null,//商店id
      // showLoading: true, // 显示加载动画
      // changeShowType: 'food', //切换显示页面
    };
  },
  components: {
    headerBar,
    footerBar,
    ratingStar
  },
  mounted() {
    // 初始化数据
    this.initData();
    // 监听事件
    window.addEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    ...mapState(["userInfo",,"cartInfo"]),
    // 公告
    promotionInfo: function() {
      return (
        this.shopDetailData.promotion_info ||
        "欢迎光临，用餐高峰期请提前下单，谢谢。"
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
    // 初始化信息
    initData() {
      this.$axios.get("/static/json/shop.json/").then(res => {
        // console.log(res.data);
        // console.log(res.data.rst);
        this.menuList = res.data.menu;
        this.shopDetailData = res.data.rst;
        this.delivery_type = this.shopDetailData.delivery_mode;
      });
    },
    // 监听滚动事件
    handleScroll() {
      // var scrollTop = document.body.scrollTop
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      // 获取头部的高度
      var r = parseFloat($("#shop_head").height());
      if (scrollTop >= r) {
        $("#shop_tab").css("position", "fixed");
        $("#menu_left").css("position", "fixed");
        $("#menu_right").css({ "margin-left": "25%", top: "2rem" });
      } else {
        $("#shop_tab").css("position", "");
        $("#menu_left").css("position", "");
        $("#menu_right").css({ "margin-left": "", top: "" });
      }
    },
    // 初始化商店评价
    getEval() {
      this.showType = "evaluate";
      this.$axios.get("/static/json/shop_comments.json/").then(res => {
        // console.log(res.data.rating);
        // console.log(res.data.rst);
        this.comments = res.data.comments;
        this.shop_rating = res.data.rating;
        this.eval_tags = res.data.tags;
      });
    },
    //点击结算
    settlement() {
      this.cartList.shopname = this.shopDetailData.name //名字
      this.cartList.delifee = this.shopDetailData.float_delivery_fee;
      this.cartList.totalPacking = this.totalPacking; //总餐盒费
      this.cartList.totalNum = this.totalNum; //总数
      this.cartList.totalPrice = this.totalPrice + this.totalPacking; //总价
      this.cartList.originalPrice = this.originalPrice + this.totalPacking; //原价
      this.cartList.cartFood = this.cartFood;
      
      this.$store.state.cartInfo = this.cartList
      if (this.userInfo) {
        // 传递参数时，params不能和path一起使用
        this.$router.push({
          name: "shoppingcart",
          // params: { cart: this.cartList }
        });

        // console.log(this.cartList)
      } else {
        // 俩种方式
        // this.$router.push({path: '/login', query:{ url:this.$route.path}});

        this.$router.push({ path: "/login?url=" + this.$route.path });
      }
    },
    //点击添加商品
    addFood(no, name, pack, pri, old_pri) {
      //判断是否已经存在该商品，并找到该商品的索引值
      let foodid = this.cartFood.findIndex(food => food.food_id == no);
      // console.log(foodid)
      // console.log(this.cartFood[foodid])
      if (foodid == -1) {
        //返回值-1，商品不存在，新添加该商品
        if (old_pri) {
          this.cartFood.push({
            food_id: no,
            name: name,
            packing_fee: pack,
            food_pri: pri,
            old_pri: old_pri,
            totalnum: 1
          });
        } else {
          this.cartFood.push({
            food_id: no,
            name: name,
            packing_fee: pack,
            food_pri: pri,
            totalnum: 1
          });
        }
      } else {
        this.cartFood[foodid].totalnum++;
      }
      this.totalNum++;
      this.totalPacking += pack;
      // console.log(this.cartFood)
      this.totalPri(pri, old_pri);
    },
    //计算总价
    totalPri(num, old) {
      if (old) {
        this.originalPrice += old;
      } else {
        this.originalPrice += num;
      }
      this.totalPrice += num;
      if (this.minimumOrderAmount - this.originalPrice <= 0) {
        $(".cart_right").addClass("gobuy");
      }
      $(".cart_left").removeClass("nofoods");
      $(".cart_left").addClass("havefoods");

      // $(".total_pri").text(this.totalPrice)
    },
    //显示购物车内容
    showCart() {
      // console.log(this.cartFood.length)
      if (this.cartFood.length) {
        // console.log("show")
        $(".catr_info").slideToggle(300);
        $(".foodlist_cover").toggle();
      }
    },
    //购物车改变数量
    cartChange(num, index) {
      //减少
      if (num === 0) {
        this.totalNum--;

        this.cartFood[index].totalnum--;
        this.totalPacking -= this.cartFood[index].packing_fee;
        this.totalPrice = this.totalPrice - this.cartFood[index].food_pri;
        if (this.cartFood[index].old_pri) {
          this.originalPrice =
            this.originalPrice - this.cartFood[index].old_pri;
        } else {
          this.originalPrice =
            this.originalPrice - this.cartFood[index].food_pri;
        }
        if (this.cartFood[index].totalnum === 0) {
          this.cartFood.splice(index, 1);
          // 没有商品，移除样式
          if (this.cartFood.length === 0) {
            $(".cart_right").removeClass("gobuy");
            $(".cart_left").addClass("nofoods");
            $(".cart_left").removeClass("havefoods");
            $(".catr_info").slideToggle(300);
            $(".foodlist_cover").hide();
          }
        }
        if (this.minimumOrderAmount - this.originalPrice > 0) {
          $(".cart_right").removeClass("gobuy");
        }
      } else {
        this.totalNum++;
        this.cartFood[index].totalnum++;
        this.totalPacking += this.cartFood[index].packing_fee;

        this.totalPrice = this.totalPrice + this.cartFood[index].food_pri;
        if (this.cartFood[index].old_pri) {
          this.originalPrice =
            this.originalPrice + this.cartFood[index].old_pri;
        } else {
          this.originalPrice =
            this.originalPrice + this.cartFood[index].food_pri;
        }
      }
      //  console.log(this.cartFood)
    },
    // 清空购物车
    clear() {
      this.cartFood = [];
      $(".cart_right").removeClass("gobuy");
      $(".cart_left").addClass("nofoods");
      $(".cart_left").removeClass("havefoods");
      $(".catr_info").slideToggle(300);
      $(".foodlist_cover").hide();
      this.totalPacking = 0;
      this.totalPrice = 0;
      this.originalPrice = 0;
      this.totalNum = 0;
    },
    // 隐藏遮盖层
    hideCover() {
      $(".catr_info").slideToggle(300);
      $(".foodlist_cover").hide();
    },
    // 评论处评分颜色
    rating_color: function(num) {
      if (num > 2) {
        return "rgb(255, 96, 0)";
      } else {
        return "rgb(137, 159, 188)";
      }
    },
    // 修改选择分类menuIndex
    changeMenu(index) {
      this.menuIndex = index;
    },
    // 显示底部优惠信息
    show_dis() {
      this.show_discount = !this.show_discount;
      if (document.body.style.overflow) {
        document.body.style.overflow =
          document.body.style.overflow == "auto" ? "hidden" : "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    },
    // 返回上一页
    goback() {
      this.$router.go(-1);
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
        z-index: 10;

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
  top: 0;
  z-index: 10;
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
    }
  }
}
.activites_show {
  color: #2395ff;
  border-bottom: 0.111rem solid #2395ff;
}
.order {
  padding-bottom: 4.5rem;
  display: flex;
  height: 100%;
  .menu_left {
    // flex: 1;
    overflow-y: auto;
    @include wh(25%, 100%);
    // min-width: 3.5rem;
    background-color: #f8f8f8;
    overflow: scroll;
    // float: left;
    z-index: 9;
    top: 2rem;
    // flex:1;
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
    width: 75%;
    height: 100%;
    // width: 12.4rem;
    // flex: 3;
    background: #fff;
  }
}
// 左侧菜单栏选中样式
.menu_active {
  background: #fff;
  border-left: 2px solid #3190e8;
}
.fixed {
  position: fixed;
  top: 1.9rem;
}
.evaluate {
  padding-bottom: 2.5rem;
  height: 100%;
  .shop_rating {
    @include wh(100%, 4.3rem);
    padding: 0.8rem 0 1.2rem 1rem;
    background-color: #fff;
    margin-bottom: 0.4rem;
    display: flex;
    .rating_left {
      width: 6.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      .rating_num {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 1.6rem;
          color: #ff6000;
        }
      }
      .rating_star {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        span {
          font-size: 0.67rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .rating_right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666 !important;
      flex: 1;
      .l_rat {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 1;
        padding: 0 0.5rem;
      }
      .r_rat {
        width: 3.4rem;
        border-left: 1px solid #ddd;
      }
    }
  }
  .shop_eval {
    background-color: #fff;
    padding: 0.5rem 0.6rem 0;
    font-size: 0.5rem;
    .rating_ul {
      padding-bottom: 0.7rem;
      border-bottom: 1px solid #eee;
    }
  }
}
// 评价列表
.eval_li {
  padding: 0.3rem 0 0.4rem;
  border-bottom: 0.01rem solid #eee;
}
.eval_info {
  position: relative;
  padding-left: 2rem;
  .pic {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
  }
}
.content {
  font-size: 0.58rem;
}
.contene_name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 0.56rem;
    margin-top: 0;
    color: #333;
    margin-right: 0.4rem;
  }
  span {
    color: #999;
    font-size: 0.45rem;
  }
}
.contene_rating {
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  span {
    font-size: 0.45rem;
    padding-left: 0.3rem;
  }
}
.content_reply {
  position: relative;
  background: #f3f3f3;
  padding: 0.3rem 0.4rem;
  border-radius: 0.2rem;
  margin-top: 0.4rem;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 0.7rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.4rem 0.4rem;
    border-color: transparent transparent #f3f3f3;
  }
}
.content_fav {
  li {
    display: inline-block;
    font-size: 0.34rem;
    padding: 0.1rem 0.2rem;
    margin-right: 0.3rem;
    margin-bottom: 0.1rem;
    color: #6d7885;
    background-color: #ebf5ff;
  }
}
// 评价类别
.rating_tags {
  display: inline-block;
  padding: 0 0.45rem;
  height: 1.4rem;
  line-height: 1.4rem;
  margin: 0.093333rem;
  font-size: 0.54rem;
  border-radius: 0.0253333rem;
  color: #6d7885;
  background-color: #ebf5ff;
}
.nothappy {
  color: #aaa;
  background-color: #f5f5f5;
}
.show_tag {
  color: #fff;
  background-color: #0097ff;
}
.show_tag_nothappy {
  color: #fff;
  background-color: #ccc;
}
.rat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    font-size: 0.67rem;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 1rem;
  }
}
//商家信息
.information {
  // padding-bottom: 2.5rem;
  height: 100%;
  font-size: 0.54rem;
  h3 {
    font-size: 0.67rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
  }
  div {
    width: 100%;
    background-color: #fff;
    margin-bottom: 0.4rem;
    padding: 0.5rem 0.7rem 1rem;
  }
  .delivery_info {
    .consume {
      display: inline-block;
      padding-left: 0.3rem;
    }
    .deli_fee {
      display: block;
      margin-top: 0.3rem;
    }
  }
  .activities_info {
    li {
      margin-bottom: 0.3rem;
    }
  }
  .shop_information {
    .info_list {
      li {
        height: 1.7rem;
        line-height: 1.7rem;
        font-size: 0.65rem;
        border-top: 0.0005rem solid #666;
        display: flex;
        justify-content: space-between;
      }
    }
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
      .food_name {
        position: relative;
        width: 5.6rem;
        padding-right: 0.5rem;
        display: flex;
        align-items: start;
        .nameText {
          font-size: 0.7rem;
          font-weight: 700;
          overflow: hidden;
          width: 5.6rem;
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
        width: 6.2rem;
      }
      .food_sales {
        width: 6.2rem;
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
        bottom: 0.1rem;
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
        right: 0.5rem;
        bottom: 0.1rem;
        @include wh(0.9rem, 0.9rem);
        display: flex;
        span {
          position: absolute;
          @include wh(0.9rem, 0.9rem);
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
//购物车
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
    z-index: 10;
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
      z-index: 10;
      .cart_icon {
        color: #fff;
        position: absolute;
        right: -0.2rem;
        top: -0.2rem;
        display: inline-block;
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0.8rem;
        font-size: 0.43rem;
        text-align: center;
        background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
        border-radius: 50%;
      }
      &.nofoods {
        background-image: radial-gradient(circle, #363636 6.266667rem, #444 0);
        z-index: 10;
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
      &.havefoods {
        &:after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: url(../../images/cart1.svg) 50% no-repeat;
          background-size: 0.6rem;
          background-size: 6vw;
          content: "";
        }
      }
    }
    .cart_middle {
      flex: 1;
      .foods_total {
        span {
          font-size: 0.75rem;
          color: #fff;
        }
        del {
          font-size: 0.6rem;
          color: #999;
        }
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
  .catr_info {
    width: 100%;
    max-height: 14rem;
    background: #fff;
    position: absolute;
    bottom: 2rem;
    z-index: 8;

    .sub_pri {
      background-color: #fffad6;
      border-top: 0.0111111rem solid #f9e8a3;
      opacity: 0.96;
      line-height: 0.8rem;
      font-size: 0.4rem;
      text-align: center;
    }
    .top {
      background: #eceff1;
      height: 2rem;
      font-size: 0.7rem;
      display: flex;
      padding: 0 0.7rem;
      justify-content: space-between;
      & > span {
        line-height: 2rem;
      }
      .clear {
        position: relative;
        font-size: 0.6rem;
        .cart_remove {
          position: absolute;
          width: 0.7rem;
          height: 0.7rem;
          left: -0.8rem;
          top: 0.18rem;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .food_list {
    font-size: 0.67rem;
    // padding: 0 0.7rem;
    max-height: 10.2rem;
    overflow: scroll;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0.7rem 0.3rem 0;
      margin-left: 0.7rem;
      min-height: 2rem;
      align-items: center;
      border-bottom: 1px solid #eee;
      span {
        flex: 1;
        &.foods_name {
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:nth-child(2) {
          text-align: right;
          span {
            font-weight: 700;
            color: rgb(255, 83, 57);
          }
          del {
            font-size: 0.45rem;
            color: #999;
            font-weight: 500;
          }
        }
      }
      .food_num {
        text-align: right;
        // position: relative;
        span {
          display: inline-block;
          align-items: center;
          a {
            display: inline-block;
          }
          .svg_icon {
            display: inline-block;
            vertical-align: middle;
            width: 0.9rem;
            height: 0.9rem;
            fill: #3190e8;
            svg {
              @include wh(100%, 100%);
            }
          }
          .total_num {
            // display: inline-block;
            width: 1rem;
            text-align: center;
          }
        }
      }
    }
  }
}
.foodlist_cover {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.gobuy {
  background-color: #38ca73 !important;
  color: #fff;
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
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  // @include wh(1rem, 0.6rem);
  // height: 0.6rem;
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
.fn_tips {
  background-color: #0097ff;
  padding: 0.1rem;
}
</style>
