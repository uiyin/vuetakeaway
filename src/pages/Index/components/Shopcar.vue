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
        另需配送费 ￥ {{sellerpeisong}}元
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '购物车'
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
}
</style>
