<template>
    <div>
        <header-bar head-title="我的" goBack="true"></header-bar>
        <section class="cont">
          <section class="profile_number">
            <router-link :to="userInfo?'/profile/info' : '/login'" class="profile_link">
              <!-- 头像 -->
              <img :src="avatar" alt="" class="privateImage" v-if="userInfo">
              <span class="privateImage" v-else>
                <svg class="privateImage-svg">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                </svg>
              </span>
              <!-- 昵称 电话 -->
              <div class="user-info">
                <p>{{username}}</p>
                <p>
                  <span class="user-icon">
                    <svg class="icon-mobile" fill="#fff">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                    </svg>
                  </span>
                  <span class="mobile-number">{{phone}}</span>
                </p>
              </div>
              <!-- 箭头 -->
              <span class="arrow">
                <svg class="arrow-svg" fill="#fff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </router-link>
          </section>
          <section class="main_info">
            <a href="javascript:;" class="info_items">
              <span class="main_num" id="wallet" v-if="userInfo"><i>{{parseInt(balance).toFixed(2)}}</i>元</span>
              <img src="../../images/wallet.svg" alt="" v-else>
              <span>钱包</span>
            </a>
            <a href="javascript:;" class="info_items">
              <span class="main_num" id="bag" v-if="userInfo"><i>{{count}}</i>个</span>
              <img src="../../images/red.svg" alt="" v-else>
              <span>红包</span>
            </a>
            <a href="javascript:;" class="info_items">
              <span class="main_num" id="gold" v-if="userInfo"><i>{{pointNumber}}</i>个</span>
              <img src="../../images/gold.svg" alt="" v-else>
              <span>金币</span>
            </a>
          </section>

          <section class="profile_list">
            <!-- 我的订单 -->
            <router-link to="order" class="myorder">
              <aside>
                <svg fill="#4aa5f0">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                </svg>
              </aside>
              <div class="myorder-div">
                <span>我的订单</span>
                <span class="myorder-divsvg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>

            </router-link>
          </section>
          <section class="profile_list">
            <!-- 积分商城 -->
            <router-link to="order" class="myorder">
              <aside>
                <svg fill="rgb(148, 217, 74)">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                </svg>
              </aside>
              <div class="myorder-div">
                <span>积分商城</span>
                <span class="myorder-divsvg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>

            </router-link>
            <!-- 分享 -->
            <router-link to="order" class="myorder">
              <aside>
                <svg fill="#ffc636">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gift"></use>
                </svg>
              </aside>
              <div class="myorder-div">
                <span>分享拿10元现金</span>
                <span class="myorder-divsvg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>

            </router-link>
          </section>
          <section class="profile_list">
            <!-- 我的客服 -->
            <router-link to="order" class="myorder">
              <aside>
                <svg fill="#4aa5f0">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service_1"></use>
                </svg>
              </aside>
              <div class="myorder-div">
                <span>我的客服</span>
                <span class="myorder-divsvg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>
            </router-link>
            <!-- 下载饿了么APP -->
            <router-link to="order" class="myorder">
              <aside>
                <svg fill="#3cabff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                </svg>
              </aside>
              <div class="myorder-div">
                <span>下载饿了么APP</span>
                <span class="myorder-divsvg">
                  <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </div>

            </router-link>
          </section>
        </section>

        <footer-bar></footer-bar>

        <transition name="router-slid" mode="out-in">
          <router-view></router-view>
        </transition>

    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import { mapState } from "vuex";

export default {
  data() {
    return {
      username: "登录/注册",
      phone: "登录后享受更多特权",
      avatar: "",
      balance: 0,
      count: 0,
      pointNumber: 0
    };
  },
  mounted() {
    // console.log(this.$route.params.phone)
    // "/static/json/userinfo.json/"+this.$route.query.phone
    //  https://cnodejs.org/api/v1/topics

    if (this.userInfo) {
      this.username = this.userInfo.username;
      this.phone = this.userInfo.phone;
      this.avatar = this.userInfo.avatar;
      this.balance = this.userInfo.balance;
      this.count = this.userInfo.gift_amount;
      this.pointNumber = this.userInfo.point;
    } else if (this.$route.params.phone) {
      this.getData();
    }
  },
  components: {
    headerBar,
    footerBar
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    getData() {
      this.$axios
        .get("/static/json/userinfo.json/")
        .then(res => {
          this.$store.state.userInfo = res.data;
          // console.log(res.data);
          // console.log(this.userInfo)
          this.userInfo.phone = this.$route.params.phone;
          this.username = this.userInfo.username;
          this.phone = this.userInfo.phone;
          this.avatar = this.userInfo.avatar;
          this.balance = this.userInfo.balance;
          this.count = this.userInfo.gift_amount;
          this.pointNumber = this.userInfo.point;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";
.cont {
  padding-bottom: 1.9rem;
}
.profile_number {
  padding-top: 1.95rem;
  // @include wh(100%, 7.4rem);
  .profile_link {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    display: block;
    display: flex;
    box-align: center;
    align-items: center;
    padding: 0.8rem 0.6rem;
    .privateImage {
      display: inline-block;
      @include wh(2.5rem, 2.5rem);
      border-radius: 50%;
      vertical-align: middle;
      .privateImage-svg {
        background: $fc;
        border-radius: 50%;
        @include wh(2.5rem, 2.5rem);
      }
    }
    .user-info {
      margin-left: 0.48rem;
      flex-grow: 1;
      p {
        font-weight: 700;
        @include sc(0.8rem, $fc);
        .user-icon {
          @include wh(0.5rem, 0.75rem);
          display: inline-block;
          vertical-align: middle;
          line-height: 0.75rem;
          .icon-mobile {
            @include wh(100%, 100%);
          }
        }
        .mobile-number {
          display: inline-block;
          @include sc(0.57333rem, $fc);
        }
      }
    }
    .arrow {
      @include wh(0.466667rem, 0.98rem);
      display: inline-block;
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}
.main_info {
  @include wh(100%, 4.222rem);
  background: $fc;
  display: table;
  border-bottom: 1px solid #ddd;
  .info_items {
    display: table-cell;
    width: 33.3333333%;
    vertical-align: middle;
    text-align: center;
    .main_num {
      i {
        font-size: 1.2rem;
        font-weight: 700;
      }
      &#wallet {
        color: rgb(0, 152, 251);
        i {
          color: rgb(0, 152, 251);
        }
      }
      &#bag {
        color: rgb(255, 95, 62);
        i {
          color: rgb(255, 95, 62);
        }
      }
      &#gold {
        color: rgb(106, 194, 11);
        i {
          color: rgb(106, 194, 11);
        }
      }
    }

    img,
    span {
      display: block;
    }
    img {
      @include wh(1.3rem, 1.3rem);
      padding: 0.4533333rem 2.1111111rem 0.4533333rem;
    }
    span {
      @include sc(0.65rem, #666);
      font-weight: 700;
    }
    &:nth-child(2) {
      border-left: 0.001rem solid #ddd;
      border-right: 0.001rem solid #ddd;
    }
  }
}
.profile_list {
  margin-top: 0.4rem;
  background: $fc;
  .myorder {
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    aside {
      @include wh(0.7rem, 0.7rem);
      margin-left: -0.866667rem;
      margin-right: 0.266667rem;
      display: flex;
      align-items: center;
      svg {
        @include wh(100%, 100%);
      }
    }
    .myorder-div {
      width: 100%;
      border-bottom: 1px solid #f1f1f1;
      padding: 0.433333rem 0.266667rem 0.433333rem 0;
      @include sc(0.7rem, #333);
      display: flex;
      justify-content: space-between;
      span {
        display: block;
      }
      .myorder-divsvg {
        @include wh(0.46667rem, 0.46667rem);
        svg {
          @include wh(100%, 100%);
        }
      }
    }
  }
}

.router-slid-enter-active, .router-slid-leave-active {
    transition: all .6s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
