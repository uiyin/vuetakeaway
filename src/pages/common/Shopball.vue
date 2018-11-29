<template>
  <div class="shopball">
    <div class="yundong">
      <transition name="fade">
        <div class="desc"
             v-show="count>0"
             @click="desc">
          <div class="inner in_move"> - </div>
        </div>
      </transition>
    </div>
    <div class="count"
         v-show="count>0">{{count}}</div>
    <div class="add"
         @click="add($event)">+</div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '小球',
      count: 0
    }
  },
  computed: {
    ...mapState({
      shopcarcontent: 'shopcar'
    })
  },
  methods: {
    ...mapMutations(['changeshopcar']),
    add (e) {
      // console.log(e)
      this.count++
      // 把自定义事件和自己这个元素发射出去 说白了也就是这个元素<div data-v-47756ef6 class="add">+</div>
      this.$emit('ballmove', e.target)
    },
    desc () {
      this.count--
    }
  }

}
</script>

<style scoped lang="less">
@keyframes bounce-in {
  0% {
    transform: translate(0.56rem, 0);
    opacity: 0;
  }
  25% {
    transform: translate(0.48rem, 0);
    opacity: 0.25;
  }
  50% {
    transform: translate(0.28rem, 0);
    opacity: 0.5;
  }
  75% {
    transform: translate(0.19rem, 0);
    opacity: 0.75;
  }
  100% {
    transform: translate(0rem, 0);
    opacity: 1;
  }
}
.shopball {
  position: absolute;
  right: 0.1rem;
  bottom: 0px;
  font-size: 20px;
  .yundong {
    float: left;
  }
  .add,
  .desc {
    width: 0.48rem;
    color: #fff;
    line-height: 0.46rem;
    height: 0.48rem;
    border-radius: 50%;
    background: #0190d4;
    text-align: center;
    float: left;
    .in_move {
      width: 0.48rem;
      height: 0.48rem;
      transform: rotate(0deg);
      transition: all 0.4s;
    }
    &.fade-enter,
    &.fade-leave {
      .in_move {
        transform: rotate(360deg);
      }
    }
    &.fade-enter-active {
      animation: bounce-in 0.4s linear;
    }
    /*动画开始到结束有*/

    &.fade-leave-active {
      animation: bounce-in 0.4s linear reverse;
    }
  }
  .count {
    width: 0.48rem;
    color: #777;
    line-height: 0.46rem;
    height: 0.48rem;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    float: left;
  }
}
</style>
