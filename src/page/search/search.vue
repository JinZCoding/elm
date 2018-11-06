<template>
    <div>
        <header-bar head-title="搜索" goBack="true"></header-bar>
        <p>search</p>

        <footer-bar></footer-bar>
    </div>
</template>
<script>
import headerBar from "../../components/header/head";
import footerBar from "../../components/footer/foot";
export default {
  data() {
    return {
    };
  },
  components: {
    headerBar,
    footerBar
  }
}
</script>