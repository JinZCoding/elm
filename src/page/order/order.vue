<template>
    <div>
        <header-bar head-title="我的订单" goBack="true"></header-bar>
        <order-list v-if="userInfo"></order-list>

        <section class="no_login" v-else>
          <img src="../../images/order.png" alt="">
          <h3>登录后查看外卖订单</h3>
          <router-link to="/login" tag="button">立即登录</router-link>
        </section>

        <footer-bar></footer-bar>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import orderList from "../../components/common/orderlist";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    headerBar,
    footerBar,
    orderList
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style lang="scss">
.no_login {
  height: 15rem;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    display: block;
    width: 8.88888rem;
    max-width: 100%;
  }
  h3 {
    margin: 0.4333rem 0 0.36666rem;
    color: #6a6a6a;
    font-weight: 400;
    font-size: 0.688888rem;
  }
  button {
    min-width: 4rem;
    background-color: #56d176;
    color: #fff;
    padding: 0.45555rem 1.4333rem;
    border-radius: 0.07777rem;
    border: none;
    font-size: 0.56666rem;
  }
}
</style>
