<template>
    <div class="rating_page">
        <header-bar head-title="账户信息" goBack="true"></header-bar>
        <section class="profile_info">
            <ul class="info_ul">
                <li class="info_li info_img">
                    <b>头像</b>
                    <span class="info_detail">
                        <input type="file" accept="image/jpeg,image/jpg,image/png" @change.stop="handleFile" class="imgInput">
                        <div class="info_img">
                            <img :src="userInfo.avatar" alt="" v-if="userInfo">
                        </div>
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </li>
                <li class="info_li ">
                    <b>用户名</b>
                    <span class="info_detail">{{userInfo.username||"饿了么"}}</span>
                </li>
            </ul>
            <h3>账号绑定</h3>
            <ul class="info_ul">
                <li class="info_li">
                    <b>手机</b> 
                    <span class="info_detail">
                        <span>{{userInfo.phone||"暂无绑定手机号"}}</span>
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                    
                </li>
            </ul>
            <h3>安全设置</h3>
            <ul class="info_ul">
                <li class="info_li reset_pwd">
                    <b>登录密码</b>
                    <span class="info_detail">
                        <span>修改</span>
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </li>
            </ul>
            <button @click="logout">退出登录</button>
        </section>
        <!-- <p>helo,test</p> -->
    </div>
</template>
<script>
import headerBar from "../../../components/header/head";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    headerBar
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods:{
    ...mapMutations(["LOGOUT"]),
    logout(){
      this.LOGOUT();
      this.$router.go(-1);
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.userInfo.avatar = res.result
        this.$store.state.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    },
  }
};
</script>

<style lang="scss">
@import "../../../style/mixin";

.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(245, 245, 245);
  z-index: 202;
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.profile_info {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  color: #333;
  font-weight: normal;
  font-family: "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular,
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  box-sizing: border-box;
  .info_ul {
    width: 100%;
    background: #fff;
    font-size: 0.67777rem;
    .info_li {
      position: relative;
      //   @include wh(100%, 2.111rem);
      min-height: 2.111rem;
      padding: 0.344444rem 0.544444rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info_detail {
        display: flex;
        align-items: center;
        font-size: 0.67rem;
        input {
          position: absolute;
          @include wh(100%, 100%);
          top: 0;
          left: 0;
          opacity: 0;
        }
        .info_img {
          @include wh(3rem, 3rem);
          border-radius: 50%;
          & > img {
            @include wh(100%, 100%);
            border-radius: 50%;
          }
        }
      }
      b {
        font-weight: 700;
      }
      svg {
        @include wh(0.4555rem, 0.4555rem);
        padding-left: 0.3rem;
      }
      //设置头像下边框
      &.info_img {
        border-bottom: 1px solid rgb(247, 246, 246);
      }
      // 设置登录密码的样式
      &.reset_pwd {
        b {
          font-weight: normal;
        }
        .info_detail {
          span {
            color: #0097ff;
          }
        }
      }
    }
  }
  h3 {
    font-size: 0.54rem;
    color: #999;
    padding: 0 0.5444rem;
    margin: 0.4445rem 0;
  }
  button {
    @include wh(100%, 2.111rem);
    min-height: 2.111rem;
    font-size: 0.766rem;
    font-weight: 700;
    margin: 0.877rem 0;
    padding: 0.344444rem 0.544444rem;
    background-color: #fff;
    color: #ff5339;
  }
}
</style>
