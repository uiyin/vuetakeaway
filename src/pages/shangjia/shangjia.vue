<template>
  <div class="shangjia">
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="gonggaoflag"></Zhezhao>
    <div class="content">
      <!--头部开始-->
      <div class="header">
        <div class="allcontent">
          <div class="title">{{seller.name}}</div>
          <div class="titlecontent">
            <div class="star">
              <div class="staritem active"
                   v-for="(item,index) in starnum"
                   :key="index"
                   v-if="Math.round(seller.score)>index">★</div>
              <div class="staritem "
                   else>☆</div>
            </div>
            <div class="titlenum">
              ({{seller.ratingCount}})
            </div>
            <div class="sellercount">
              月售{{seller.sellCount}}单
            </div>

          </div>
          <div class="like"
               @click="changeflag">

            <div :class="[shoucangflag?'iconfont icon-shoucang iconstyle red':'iconfont icon-shoucang iconstyle']"></div>
            <div>
              <div class="shoucangcontent"
                   v-if="shoucangflag">已收藏</div>
              <div class="shoucangcontent"
                   v-if="!shoucangflag">收藏</div>
            </div>

          </div>
        </div>

      </div>
      <!--头部结束-->
      <!--评分开始-->
      <div class="header2">
        <div class="header2_item">
          <div class="name">起送价</div>
          <div class="pricedetail">
            <span class="pricename">20</span>
            <span class="danwei">元 </span>
          </div>
        </div>
        <div class="header2_item">
          <div class="name">商家配送</div>
          <div class="pricedetail">
            <span class="pricename">{{seller.deliveryPrice}}</span>
            <span class="danwei">元 </span>
          </div>
        </div>
        <div class="header2_item">
          <div class="name">平均配送时间</div>
          <div class="pricedetail">
            <span class="pricename">{{seller.deliveryTime}}</span>
            <span class="danwei">分钟 </span>
          </div>
        </div>
      </div>
      <!--评分结束-->
      <!--分割开始-->
      <div class="fenge"></div>
      <!--分割结束-->
      <!--介绍开始-->
      <div class="goodsinfocontent">
        <div class="contentheader">公告与活动</div>
        <div class="goodscontentinfo">
          {{seller.bulletin}}
        </div>
      </div>
      <!--介绍结束-->
      <!--优惠信息内容开始-->
      <div class="youhuicontent">
        <div class="youhuiitem"
             v-for="(item,index) in seller.supports"
             :key="index">

          <img :src="jianimg"
               alt=""
               class="youhuiicon"
               v-if="item.type==0">
          <img :src="zheimg"
               alt=""
               class="youhuiicon"
               v-else-if="item.type==1">
          <img :src="teimg"
               alt=""
               class="youhuiicon"
               v-else-if="item.type==2||3||4">

          <div class="text2">{{item.description}}</div>
        </div>

      </div>
      <!--优惠信息内容结束-->
      <!--分割开始-->
      <div class="fenge"></div>
      <!--分割结束-->
      <!--商家照片开始-->
      <div class="shopphoto">
        <div class="shopphotocontent">
          <div class="shoptitle">商家实景</div>
          <div class="photoall"
               ref="photowrapper">
            <ul ref="photoul">
              <li v-for="(item,index) in seller.pics"
                  :key="index"
                  class="itemli">
                <img :src="item"
                     alt=""
                     class="imgcontent">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--商家照片结束-->
      <!--分割开始-->
      <div class="fenge"></div>
      <!--分割结束-->
      <!--商家信息开始-->
      <div class="shopinfo">
        <div class="shoptitle">商家信息</div>
        <ul>
          <li class="infoli"
              v-for="(item,index) in seller.infos"
              :key="index">{{item}}</li>
        </ul>
      </div>
      <!--商家信息结束-->
    </div>
  </div>
</template>

<script>
import Zhezhao from '@/pages/common/Zhezhao'
import BScroll from 'better-scroll'
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import getdata from '@/axios/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '商家页',
      seller: {},
      starnum: 4,
      shoucangflag: false,
      starimg: require('@/assets/images/star36_on@2x.png'),
      failstarimg: require('@/assets/images/star24_off@3x.png'),
      jianimg: require('@/assets/images/decrease_2@2x.png'),
      zheimg: require('@/assets/images/discount_1@3x.png'),
      teimg: require('@/assets/images/special_1@3x.png')
    }
  },
  components: {
    Header,
    Nav,
    Zhezhao
  },
  created () {
    this.getseller()
    setTimeout(this.setWidth, 1000)
  },
  computed: {
    ...mapState(['gonggaoflag'])
  },
  methods: {
    ...mapMutations(['alterflag']),
    setWidth () {
      let dom = this.$refs.photoul
      let length = this.seller.pics.length
      dom.style.width = length * (120 + 10) + 'px'
      this.initbetterscroll()
    },
    initbetterscroll () {
      let _this = this
      this.$nextTick(function () {
        let wrapper = _this.$refs.photowrapper
        _this.scroll = new BScroll(wrapper, {
          click: true,
          scrollX: true,
          scrollY: false,
          bounce: {
            top: false,
            bottom: false
          }
        })
        console.log(_this.scroll)
      })
    },
    changeflag () {
      this.shoucangflag = !this.shoucangflag
      console.log(this.shoucangflag)
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
.shangjia {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  .content {
    .header {
      padding: 0.36rem 0.36rem;
      position: relative;
      .allcontent {
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.2rem;
        .title {
          font-size: 20px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          line-height: 28px;
        }
        .titlecontent {
          overflow: hidden;
          margin-top: 0.1rem;
          .star {
            float: left;
            .staritem {
              font-size: 18px;
              margin-right: 0.1rem;
              float: left;
              line-height: 36px;
              &.active {
                color: goldenrod;
              }
            }
          }
          .titlenum {
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 36px;
            float: left;
            margin-left: 0.2rem;
          }
          .sellercount {
            margin-left: 0.2rem;
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 36px;
            float: left;
          }
        }
        .like {
          position: absolute;
          right: 0.36rem;
          top: 0.46rem;
          width: 1.5rem;
          height: 1.18rem;
          font-size: 24px;
          color: rgb(77, 85, 93);
          line-height: 20px;
          text-align: center;
          .iconstyle {
            font-size: 20px;
            &.red {
              color: red;
            }
          }
          .shoucangcontent {
            font-size: 18px;
            color: rgb(77, 85, 93);
            line-height: 20px;
            margin-top: 0.4rem;
          }
        }
      }
    }
    .header2 {
      display: flex;
      flex-flow: row nowrap;
      padding: 0.18rem 0.36rem;
      .header2_item {
        flex: 1;
        height: 1rem;
        border-right: 1px solid #ccc;
        text-align: center;
        .name {
          font-size: 16px;
          text-align: center;
          color: rgb(147, 153, 159);
        }
        .pricedetail {
          font-size: 32px;
          margin-top: 0.2rem;
          text-align: center;
          overflow: hidden;
          .pricename {
          }
          .danwei {
            font-size: 16px;
            color: rgb(147, 153, 159);
          }
        }
      }
      .header2_item:nth-of-type(3) {
        border-right: 0px;
      }
    }
    .fenge {
      width: 100%;
      height: 0.6rem;
      background: #f3f5f7;
      margin-top: 0.3rem;
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
    .youhuicontent {
      width: 90%;
      margin: 0 auto;
      margin-top: 0.48rem;
      overflow: hidden;
      .youhuiitem {
        overflow: hidden;
        height: 0.64rem;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        padding-bottom: 0.24rem;
        margin-bottom: 0.24rem;
        border-bottom: 1px solid #ccc;
        .youhuiicon {
          height: 0.64rem;
          flex: 0 0 0.64rem;
        }
        .text2 {
          font-size: 14px;
          font-weight: 200;
          color: black;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 0.2rem;
          margin-top: 0.15rem;
        }
      }
      .youhuiitem:nth-last-child(1) {
        margin-bottom: 0rem;
        border-bottom: none;
      }
    }
    .shopphoto {
      padding: 0.36rem 0.36rem;
      padding-bottom: 0px;
      height: 3.36rem;
      .shopphotocontent {
        overflow: hidden;
        .shoptitle {
          font-size: 18px;
          color: black;
          font-weight: 700;
        }
        .photoall {
          width: 6.68rem;
          height: 1.8rem;
          margin-top: 0.6rem;
          ul {
            overflow: hidden;
            .itemli {
              width: 2.4rem;
              height: 1.8rem;
              margin-right: 0.2rem;
              float: left;
              .imgcontent {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .itemli:nth-last-child(1) {
              margin-right: 0px;
            }
          }
        }
      }
    }
    .shopinfo {
      padding: 0.36rem 0.36rem;
      .shoptitle {
        font-size: 18px;
        color: black;
        font-weight: 700;
        border-bottom: 1px solid #ccc;
        height: 1rem;
        line-height: 1rem;
      }
      ul {
        .infoli {
          width: 100%;
          height: 1rem;
          color: black;
          font-weight: 200;
          font-size: 12px;
          line-height: 1rem;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
