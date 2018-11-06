<template>
    <div>
        <header-bar head-title="我的订单" goBack="true"></header-bar>
        <order-list>
        </order-list>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
import orderList from "../../components/common/orderlist";
export default {
  data() {
    return {
    };
  },
  components: {
    headerBar,
    footerBar,
    orderList
  }
}
</script>