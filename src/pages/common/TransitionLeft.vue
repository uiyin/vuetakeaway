<template>

  <transition name="yundongleft"
              tag="div">
    <slot name="left"></slot>
  </transition>

</template>

<script>
export default {
  name: 'TransitionLeft',
  data () {
    return {
      message: '运动'
    }
  }
}
</script>

<style scoped lang="less">
@keyframes moveleft {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
.yundongleft-transition {
  transition: 2s;
  transform: translate(0, 0);
}
.yundongleft-enter-active,
.yundongleft-leave-active {
  animation: moveleft 2s reverse linear;
}
</style>
