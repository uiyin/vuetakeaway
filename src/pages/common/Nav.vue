<template>
  <div>
    <div class="nav">
      <router-link to="/"
                   tag="div"
                   class="linka">商品</router-link>
      <router-link to="/pingjia"
                   tag="div"
                   class="linka">评价</router-link>
      <router-link to="/shangjia"
                   tag="div"
                   class="linka">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '导航'
    }
  }
}
</script>

<style scoped lang="less">
.nav {
  display: flex;
  flex-flow: row nowrap;
  height: 0.8rem;
  width: 100%;
  box-shadow: 2px 2px 2px #eee;
  .linka {
    flex: 1;
    font-size: 16px;
    color: rgb(77, 85, 93);
    line-height: 0.8rem;
    text-align: center;
    &.router-link-exact-active.router-link-active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
