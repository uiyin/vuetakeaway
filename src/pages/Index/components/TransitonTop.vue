<template>
  <div>
    <transition name="topmenu">
      <slot name="movetop"></slot>
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
@keyframes gotop_in {
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, 50%);
  }
  100% {
    transform: translate(0, 0);
  }
}
.topmenu-enter-active {
  animation: gotop_in 0.5s linear;
}
.topmenu-leave-active {
  animation: gotop_in 0.5s linear reverse;
}
</style>
