<template>
    <div>
        <!-- <header-bar head-title="我的" goBack="true"></header-bar> -->
        <div class="shop_head">
            <div class="header">
                <nav class="header_all">
                    <a href="javascript:;" class="goback"></a>
                </nav>
                <div class="header_title">
                    <div class="shop_img">
                        <span class="shop_tips mini_tips">
                            <span>品牌</span>
                        </span>
                        <img src="../../images/title.png" alt="">
                    </div>
                    <div class="shop_title">
                        <h2 class="tit">
                            <span>金百万烤鸭（丝竹园店）</span>
                            <i></i>
                        </h2>
                        <div class="shop_detail">
                            <span class="det_tips">评价4.5</span>
                            <span class="det_tips">月售3309单</span>
                            <span class="det_tips">蜂鸟快送约33分钟</span>
                        </div>
                    </div>
                    <div class="shop_discount shop_width">
                        <div class="dis_left">
                            <div>
                                <span class="first_tips mini_tips">
                                    <span>首单</span>
                                </span>
                                <span>新用户下单立减17元(不与其它活动同享)</span>
                            </div>
                        </div>
                        <div class="dis_right">13个优惠</div>
                    </div>
                    <p class="shop_info shop_width">
                        公告：餐厅电话：111111111111
                    </p>
                </div>
            </div>
        </div>

        
        <div class="shop_menu">
            <!-- <el-tabs :tab-position="tabPosition" >
                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            </el-tabs> -->
        </div>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";

export default {
  data() {
    return {
      //   tabPosition: "top"
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
    this.$axios.get("/static/json/shop.json/").then(res => {
      console.log(res.data);
    });
  },
  methods: {
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
            .first_tips {
              display: inline-block;
              border-radius: 0.1rem;
              background-color: rgb(112, 188, 70);
              @include wh(1rem, 0.6rem);
              span {
                @include sc(0.3334rem, #fff);
              }
            }
          }
        }
        .dis_right {
          color: #999;
          position: relative;
          &::after{
              position: absolute;
              content: "";
              display: block;
              border-style: solid;
              margin-left: 0.2rem;
              border-width:0.24rem 0.1666rem 0 0.1666rem ;
              border-color: #999 transparent transparent transparent;
              top: 50%;
              transform: translateY(-50%);
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
.mini_tips {
  position: relative;
  font-size: 0.3333rem;
  color: transparent;
  white-space: nowrap;
}
// .shop_menu{
//     position: relative;
//     padding-top: 2rem;
// }
</style>
