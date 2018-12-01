<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="allcontent" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/detail') {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: "Microsoft YaHei";
}
.allcontent {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(7.5rem, 0);
  transform: translate(7.5rem, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-7.5rem, 0);
  transform: translate(-7.5rem, 0);
}
</style>
