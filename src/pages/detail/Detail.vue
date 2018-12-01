<template>
  <div class="detail">
    <!--头图开始-->
    <div class="header">
      <img :src="dataall.image"
           alt=""
           class="headerimg">
      <div class="iconfont icon-fanhui iconstyle"
           @click="fanhui"></div>
    </div>
    <!--头图结束-->
    <!--标题开始-->
    <div class="headercontent">
      <div class="title">{{dataall.name}}</div>
      <div class="infocontent">
        <div class="info">月售{{dataall.sellCount}}份</div>
        <div class="haoping">好评率{{dataall.rating}}%</div>
      </div>
      <div class="allprice">
        <div class="newprice">￥{{dataall.price}}</div>
        <div class="oldPrice">￥{{dataall.oldPrice}}</div>
      </div>
      <div class="shopbutton">
        <div class="shopcar_content"
             v-if="count==0"
             @click="showball">
          购物车
        </div>
        <div v-else>
          <ShopBall :data="balldata"
                    @ballmove="getdom"></ShopBall>
        </div>
      </div>
    </div>
    <!--标题结束-->
    <!--分隔符开始-->
    <div class="fenge"></div>
    <!--分隔符结束-->
    <!--介绍开始-->
    <div class="goodsinfocontent">
      <div class="contentheader">商品介绍</div>
      <div class="goodscontentinfo">
        {{dataall.info}}
      </div>
    </div>
    <!--介绍结束-->
    <!--分隔符开始-->
    <div class="fenge"></div>
    <!--分隔符结束-->
    <!--评论组件开始-->
    <Rating :dataall="ratingall"></Rating>
    <!--评论组件结束-->
    <!--底部购物车开始-->
    <ShopCar :dataall="shopdata"
             :sellercontent="seller"
             ref="shopcar"
             @showbottom="changeshopcar"
             :flag="shopcarflag"></ShopCar>
    <GoTop>
      <BottomShop v-show="shopcarflag"
                  @closeflag="changeshopcar"
                  slot="movetop"
                  @ballmove="getdom"></BottomShop>
    </GoTop>
    <!--底部购物车结束-->
  </div>
</template>

<script>
import Rating from '@/pages/common/Rating'
import ShopBall from '@/pages/common/ShopBall'
import ShopCar from '@/pages/Index/components/ShopCar'
import BottomShop from '@/pages/Index/components/BottomShopcar'
import GoTop from '@/pages/Index/components/TransitonTop'
import getdata from '@/axios/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      dataall: this.$route.params.data, // 获取的就是goods里面单个的
      seller: {},
      shopcarflag: false

    }
  },
  computed: {
    ...mapState({
      shopdata: 'shopcar'
    }),
    ratingall () {
      let _this = this
      let value = this.dataall.ratings
      let value2 = value.map((item, index) => {
        let time2 = _this.timestampToTime(item.rateTime)
        item.rateTime = time2
        return item
      })
      return value2
    },
    balldata () {
      let data = this.dataall
      let obj2 = {
        name: data.name, // 获取到name
        price: data.price, // 获取到价格
        count: 1 // 购买的数量
      }
      return obj2
    },
    count () {
      let value = this.shopdata
      let value2 = this.dataall
      if (value.length !== 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].name === value2.name) {
            return value[i].count
          }
        }
      }
      return 0
    }
  },
  created () {
    this.getseller()
    console.log(this.dataall)
  },
  components: {
    ShopCar,
    BottomShop,
    GoTop,
    ShopBall,
    Rating
  },
  methods: {
    ...mapMutations(['changeshopcar']),
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = 2018 + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + ' '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change (t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    fanhui () {
      this.$router.go(-1)
    },

    showball () {
      let data = this.dataall
      let obj2 = {
        name: data.name, // 获取到name
        price: data.price, // 获取到价格
        count: 1 // 购买的数量
      }
      this.shopdata.push(obj2)
    },
    changeshopcar (content) {
      this.shopcarflag = content
    },
    getdom (target) {
      // console.log(target)
      // 获取到了DOM节点了然后传递给shopcar
      // 调用shopcar里面的方法
      this.$refs.shopcar.drop(target)
    },
    getseller () {
      let _this = this
      let obj = {
        url: '/api/seller',
        method: 'get',
        data: {}
      }
      getdata(obj).then((res) => {
        if (res.errno === 0) {
          _this.seller = res.data
        }
        console.log(_this.seller)
      })
    }
  }

}
</script>

<style scoped lang="less">
.detail {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  .header {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
    .headerimg {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      display: block;
    }
    .iconstyle {
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
      font-size: 18px;
      color: white;
    }
  }
  .headercontent {
    position: relative;
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #07111b;
      line-height: 28px;
      margin-top: 0.36rem;
      margin-left: 0.36rem;
    }
    .infocontent {
      margin-top: 0.16rem;
      overflow: hidden;
      .info,
      .haoping {
        font-size: 16px;
        float: left;
        line-height: 24px;
        margin-left: 0.36rem;
        color: rgb(147, 153, 159);
      }
    }
    .allprice {
      margin-top: 0.36rem;
      overflow: hidden;
      .newprice {
        font-size: 18px;
        font-weight: 700;
        color: red;
        line-height: 28px;
        margin-left: 0.36rem;
        float: left;
      }
      .oldPrice {
        font-size: 12px;
        font-weight: 700;
        color: rgb(147, 153, 159);
        line-height: 28px;
        margin-left: 0.36rem;
        text-decoration: line-through;
        float: left;
      }
    }
    .shopbutton {
      position: absolute;
      right: 0.2rem;
      bottom: 0px;
      width: 2rem;
      height: 0.5rem;
      .shopcar_content {
        background: #0190d4;
        border-radius: 10px;
        font-size: 14px;
        color: white;
        text-align: center;
        line-height: 0.45rem;
      }
    }
  }
  .fenge {
    margin-top: 0.36rem;
    width: 100%;
    height: 0.32rem;
    background: #f3f5f7;
  }
  .goodsinfocontent {
    padding: 0.36rem 0.36rem;
    padding-bottom: 0rem;
    .contentheader {
      font-size: 18px;
      font-weight: 700;
      color: #07111b;
    }
    .goodscontentinfo {
      margin-top: 0.2rem;
      font-size: 14px;
      line-height: 24px;
      color: rgb(77, 85, 93);
    }
  }
}
</style>
