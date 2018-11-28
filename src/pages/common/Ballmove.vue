<template>
  <div class="yundong">
    <transition name="fade">
      <slot name="jianfa"></slot>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '运动'
    }
  }
}
</script>

<style scoped lang="less">
.yundong {
  float: left;
}
@keyframes bounce-in {
  0% {
    transform: translate(0.96rem, 0);
    opacity: 0;
  }
  50% {
    transform: translate(0.48rem, 0);
    opacity: 0.5;
  }
  100% {
    transform: translate(0rem, 0);
    opacity: 1;
  }
}

.fade-enter-active {
  animation: bounce-in 0.25s;
}
/*动画开始到结束有*/

.fade-leave-active {
  animation: bounce-in 0.25s reverse;
}
</style>
