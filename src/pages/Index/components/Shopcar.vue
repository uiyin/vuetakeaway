<template>
  <div class="shopcar">
    <div class="shopcarleft">
      <div class="shopcarwrapper">
        <div :class="[dataall.length>0?'shopcarcontent active':'shopcarcontent']">
          <div class="iconfont icon-gouwuchekong shopcaricon"></div>
        </div>
        <div class="righticon"
             v-show="dataall.length>0">{{countnum}}</div>
      </div>
      <div class="priceresult">
        ￥{{allprice}}
      </div>
      <div class="pricepeisong">
        配送费 ￥ {{sellerpeisong}}元
      </div>
    </div>
    <div class="shopcarright">
      <div class="jiesuan"
           v-if="allprice>=miniprice">
        结算
      </div>
      <div else>
        ￥ {{miniprice}}元起送
      </div>
    </div>
    <!--小球动画开始-->
    <div class="ball-container">
      <!--循环小球，小球出现与否取决于属性show-->
      <transition v-for="(item,index) in balls"
                  :key="index"
                  @before-enter='beforeEnter'
                  @enter='enter'
                  @after-enter='afterEnter'>
        <div v-show="item.show"
             class="ball">
          <!--里面还需要一层是内层,因为最外层是横向移动，里面是纵向移动-->
          <div class="inner inner-hook"></div>
        </div>
      </transition>

      <!--循环小球结束-->
    </div>
    <!--小球动画结束-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '购物车',
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  props: ['dataall', 'sellercontent'],
  computed: {
    countnum () {
      let value = this.dataall
      let num = 0
      value.forEach((item, index) => {
        num += item.count
      })
      return num
    },
    allprice () {
      let value = this.dataall
      let result = 0
      value.forEach((item, index) => {
        result += item.count * item.newprice
      })
      return result
    },
    sellerpeisong () {
      return this.sellercontent.deliveryPrice
    },
    miniprice () {
      return this.sellercontent.minPrice
    }
  },
  methods: {
    drop (target) {
      // console.log(target)
      // 这个作用就是筛选出来balls里面的show为false变成true,放到dropBalls里面
      // 也就是动画开关这个小球要是true就表示已经进行动画了。要是false就表示还没有动画
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      // console.log(el)
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
          // console.log(rect)
          let x = -36 // 小球x方向位移= 小球距离屏幕左侧的距离-外层盒子距离水平的距离 定位找的父级
          let y = -(window.innerHeight - rect.top - 36) // 负数，因为是从左上角向下
          el.style.display = '' // 清空display
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)` // 设置外层盒子，即小球垂直方向的位移
          el.style.transform = `translate3d(0, ${y}px, 0)`
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)` // 设置内层盒子，即小球水平方向的距离
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 触发重绘html
      this.$nextTick(() => {
        // 让动画效果异步执行,提高性能
        let x = -(window.innerWidth - 50)
        el.style.webkitTransform = `translate3d(0, 0, 0)` // 设置小球掉落后最终的位置
        el.style.transform = `translate3d(0, 0, 0)`
        // 处理内层动画
        let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)` // 设置内层盒子，即小球水平方向的距离
        inner.style.transform = `translate3d(${x}px, 0, 0)`
        el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
      if (ball) {
        ball.show = false
        el.style.display = 'none' // 隐藏小球
      }
    }

  }
}
</script>

<style scoped lang="less">
.shopcar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 1.16rem;
  background: #141d27;
  display: flex;
  flex-flow: row nowrap;
  .shopcarleft {
    flex: 1;
    height: 100%;
    position: relative;
    .shopcarwrapper {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      position: absolute;
      left: 0.36rem;
      top: -0.3rem;
      background: #141d27;
      .righticon {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 0.48rem;
        height: 0.3rem;
        background: rgb(240, 20, 20);
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        font-size: 12px;
        color: white;
        text-align: center;
        line-height: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .shopcarcontent {
        width: 1.2rem;
        height: 1.2rem;
        background: #ccc;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 0.11rem;
        overflow: hidden;
        &.active {
          background: #0190d4;
        }
        &.active .shopcaricon {
          color: white;
        }
        .shopcaricon {
          width: 0.8rem;
          height: 0.8rem;
          font-size: 36px;
          color: #777;
          margin: 0 auto;
          margin-top: 0.2rem;
        }
      }
    }
    .priceresult {
      position: absolute;
      left: 1.8rem;
      font-size: 18px;
      font-weight: 700;
      line-height: 58px;
      color: rgb(255, 255, 255, 0.4);
      width: 1.2rem;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pricepeisong {
      position: absolute;
      left: 3rem;
      font-size: 14px;
      font-weight: 700;
      line-height: 58px;
      color: rgb(255, 255, 255, 0.4);
    }
  }
  .shopcarright {
    flex: 0 0 2.1rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    line-height: 58px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    .jiesuan {
      text-align: center;
      background: green;
      color: white;
    }
  }
  .ball-container {
    flex: 0 0 0.32rem;
    .ball {
      &.v-enter-active {
        /* 可以在上面的工具里跳出自己想要的曲线，调整参数 */
        transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      }

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #f00;
        transition: all 0.6s linear;
      }
    }
  }
}
</style>
