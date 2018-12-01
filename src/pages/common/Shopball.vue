<template>
  <div class="shopball">
    <div class="yundong">
      <transition name="fade">
        <div class="desc"
             v-show="count>0"
             @click.stop="desc">
          <div class="inner in_move"> - </div>
        </div>
      </transition>
    </div>
    <div class="count"
         v-show="count>0">{{count}}</div>
    <!--加stop防止冒泡-->
    <div class="add"
         @click.stop="add($event)">+</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '小球'
    }
  },
  props: ['data'],
  computed: {
    ...mapState({
      shopcarcontent: 'shopcar'
    }),
    count () {
      let result = this.data
      let shopdata = this.shopcarcontent
      for (let i = 0; i < shopdata.length; i++) {
        if (result.name === shopdata[i].name) {
          return shopdata[i].count
        }
      }
      return 0
    }
  },
  methods: {
    ...mapMutations(['changeshopcar']),
    add (e) {
      let shopdata = this.shopcarcontent
      let data = this.data
      let obj2 = {
        name: data.name, // 获取到name
        price: data.price, // 获取到价格
        count: 1 // 购买的数量
      }
      let count = 0 // 查重
      if (shopdata.length === 0) {
        shopdata.push(obj2)
      } else {
        for (let i = 0; i < shopdata.length; i++) {
          if (shopdata[i].name !== data.name) {
            count++
          } else {
            shopdata[i].count++
          }
        }
        if (count === shopdata.length) {
          shopdata.push(obj2)
        }
      }
      this.changeshopcar(shopdata)
      // 把自定义事件和自己这个元素发射出去 说白了也就是这个元素<div data-v-47756ef6 class="add">+</div>
      this.$emit('ballmove', e.target)
    },
    desc () {
      let shopdata = this.shopcarcontent
      let data = this.data
      for (let i = 0; i < shopdata.length; i++) {
        if (shopdata[i].name === data.name) {
          if (shopdata[i].count === 1) {
            shopdata.splice(i, 1)
          } else {
            shopdata[i].count--
          }
          this.changeshopcar(shopdata)
        }
      }
      console.log(this.shopcarcontent)
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
