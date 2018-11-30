<template>
  <div class="shopbg">
    <!--背景层开始-->
    <div class="bottomshopcar"
         @click="closeflag"></div>
    <!--背景层结束-->
    <!--内容开始-->
    <div class="contentshopcar">
      <div class="contentheader">
        <div class="title">购物车</div>
        <div class="tuichu"
             @click="closeflag">退出</div>
        <div class="qingkong"
             v-show="shopcar.length>0"
             @click="clearall">清空</div>

      </div>
      <div class="shopcontentall">
        <ul class="shopcontentul">
          <li class="shopcontentli"
              v-for="(item,index) in shopcar"
              :key="index">
            <div class="name">{{item.name}}{{item.count}}</div>
            <div class="xiaoche">
              <ShopBall :data="item"
                        @ballmove="yundong"></ShopBall>
            </div>
            <div class="num">￥{{item.price}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--内容结束-->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ShopBall from '@/pages/common/ShopBall'
export default {
  data () {
    return {
      message: '底部'
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      shopcar: 'shopcar'
    })
  },
  components: {
    ShopBall
  },
  methods: {
    yundong (target) {
      this.$emit('ballmove', target)
    },
    ...mapMutations(['changeshopcar']),
    closeflag () {
      this.$emit('closeflag', false)
    },
    clearall () {
      let value = this.shopcar
      value.splice(0, value.length)
      console.log(value)
      this.changeshopcar(value)
      console.log(this.shopcar)
      this.closeflag()
    }
  }
}
</script>

<style scoped lang="less">
.shopbg {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  .bottomshopcar {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.6);
    filter: blur(3px);
  }
  .contentshopcar {
    position: absolute;
    left: 0px;
    bottom: 0rem;
    max-height: 7.53rem;
    min-height: 3.08rem;
    background: white;
    width: 100%;
    .contentheader {
      width: 100%;
      height: 0.8rem;
      background: #f3f5f7;
      .title {
        font-size: 14px;
        line-height: 0.8rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
        float: left;
        margin-left: 0.36rem;
      }
      .qingkong,
      .tuichu {
        float: right;
        font-size: 12px;
        line-height: 0.8rem;
        font-weight: 200;
        color: rgb(0, 160, 220);
        margin-right: 0.36rem;
      }
    }
    .shopcontentall {
      width: 90%;
      margin: 0 auto;
      max-height: 5rem;
      overflow: scroll;
      padding-bottom: 2.08rem;
      .shopcontentli {
        width: 100%;
        height: 0.96rem;
        line-height: 0.96rem;
        font-size: 14px;
        color: rgb(7, 17, 27);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        position: relative;
        .name {
          float: left;
        }
        .num {
          float: right;
          color: rgb(240, 20, 20);
          font-size: 20px;
        }
        .xiaoche {
          width: 1.8rem;
          float: right;
          height: 0.48rem;
          position: relative;
          margin-top: 0.24rem;
        }
      }
    }
  }
}
</style>
