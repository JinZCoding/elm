<template>
    <div>
        <header-bar head-title="搜索" goBack="true"></header-bar>
        <div class="cont">
          <router-link to="/search/test">search</router-link>
          
          <transition name="router-slid" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
export default {
  data() {
    return {};
  },
  components: {
    headerBar,
    footerBar
  }
};
</script>
<style lang="scss">
.cont {
  padding-top: 1.9rem;
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
