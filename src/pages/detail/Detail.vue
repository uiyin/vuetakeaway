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
    <!--商品评价开始-->
    <div class="ratingcontent">
      <div class="ratingheader">商品评价</div>
      <div class="ratingnav">
        <span @click="choosekouwei(2)">全部 {{ratingall.length}}</span>
        <span @click="choosekouwei(0)">推荐 {{tuijian}}</span>
        <span @click="choosekouwei(1)">吐槽 {{tucao}}</span>
      </div>
      <!--只看有内容的评价-->
      <div class="chooserating"
           @click="changedata">
        <span :class="[dataflag?'iconfont icon-duigou iconchoose active':'iconfont icon-duigou iconchoose']"></span>
        <span :class="[dataflag?'choosecontent active':'choosecontent']"> 只看有内容的评价</span>
      </div>
      <!--只看有内容的评价-->
      <!--评论合集开始-->
      <ul class="ratingall">
        <!--全部下面的选择有评论和没有评论的-->
        <li v-for="(item,index) in ratingall"
            :key="index"
            v-if="!dataflag&&kouwei==2">
          <div class="ratingheader">
            <div class="ratingleft">{{item.rateTime}}</div>
            <div class="ratingright">{{item.username}}
              <img :src="item.avatar"
                   class="ratingavaster">
            </div>
          </div>
          <div class="ratinglicontent">
            {{item.text?item.text:'此用户没有评论'}}
          </div>
        </li>
        <li v-for="(item,index) in ratingall"
            :key="index"
            v-if="dataflag&&item.text&&kouwei==2">
          <div class="ratingheader">
            <div class="ratingleft">{{item.rateTime}}</div>
            <div class="ratingright">{{item.username}}
              <img :src="item.avatar"
                   class="ratingavaster">
            </div>
          </div>
          <div class="ratinglicontent">
            {{item.text}}
          </div>
        </li>
        <!--全部下面有评论和没有评论的结束-->
        <!--推荐与吐槽下面的有评论和没有评论的开始-->
        <li v-for="(item,index) in ratingall"
            :key="index"
            v-if="!dataflag&&item.rateType==kouwei">
          <div class="ratingheader">
            <div class="ratingleft">{{item.rateTime}}</div>
            <div class="ratingright">{{item.username}}
              <img :src="item.avatar"
                   class="ratingavaster">
            </div>
          </div>
          <div class="ratinglicontent">
            {{item.text?item.text:'此用户没有评论'}}
          </div>
        </li>
        <li v-for="(item,index) in ratingall"
            :key="index"
            v-if="dataflag&&item.text&&item.rateType==kouwei">
          <div class="ratingheader">
            <div class="ratingleft">{{item.rateTime}}</div>
            <div class="ratingright">{{item.username}}
              <img :src="item.avatar"
                   class="ratingavaster">
            </div>
          </div>
          <div class="ratinglicontent">
            {{item.text}}
          </div>
        </li>
        <!--推荐与吐槽下面有评论和没有评论的结束-->
      </ul>
      <!--评论合集结束-->
    </div>
    <!--商品评价结束-->
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
      shopcarflag: false,
      dataflag: false, // 为了选择有用户评论还是没有评论的
      kouwei: 2 // 默认是2选择的就是全部 2就是全部 0 就是推荐 1就是吐槽
    }
  },
  computed: {
    ...mapState({
      shopdata: 'shopcar'
    }),
    tuijian () {
      let value = this.ratingall
      let num = 0
      for (let i = 0; i < value.length; i++) {
        if (value[i].rateType === 0) {
          num++
        }
      }
      return num
    },
    tucao () {
      let value = this.ratingall
      let num = 0
      for (let i = 0; i < value.length; i++) {
        if (value[i].rateType === 1) {
          num++
        }
      }
      return num
    },
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
    ShopBall
  },
  methods: {
    ...mapMutations(['changeshopcar']),
    choosekouwei (value) {
      this.kouwei = value
    },
    changedata () {
      this.dataflag = !this.dataflag
    },
    fanhui () {
      this.$router.go(-1)
    },
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
  .ratingcontent {
    padding: 0.36rem 0.36rem;
    margin-bottom: 1rem;
    .ratingheader {
      font-size: 18px;
      font-weight: 700;
      color: #07111b;
    }
    .ratingnav {
      padding-bottom: 0.36rem;
      border-bottom: 1px solid #ccc;
      span {
        font-size: 14px;
        line-height: 32px;
        background: #0190d4;
        padding: 0.16rem 0.16rem;
        text-align: center;
        color: white;
        border-radius: 12px;
      }
      span:nth-of-type(2) {
        background: rgb(0, 160, 220);
      }
      span:nth-of-type(3) {
        background: rgb(77, 85, 93);
      }
    }
    .chooserating {
      padding-bottom: 0.36rem;
      font-size: 32px;
      color: #777;
      border-bottom: 1px solid #ccc;
      .iconchoose {
        &.active {
          color: green;
        }
      }
      .choosecontent {
        font-size: 14px;
        color: #777;
        &.active {
          color: green;
        }
      }
    }
  }
  .ratingall {
    li {
      padding: 0.36rem 0.36rem;
      border-bottom: 1px solid #ccc;
      .ratingheader {
        overflow: hidden;
        .ratingleft {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 24px;
          float: left;
        }
        .ratingright {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 24px;
          float: right;
          .ratingavaster {
            width: 24px;
            height: 24px;
            float: right;
            display: block;
            margin-left: 0.2rem;
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
      .ratinglicontent {
        font-size: 16px;
        color: #0190d4;
        line-height: 24px;
        margin-top: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
