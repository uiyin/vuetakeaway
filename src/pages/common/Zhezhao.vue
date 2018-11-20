<template>
  <div>
    <div class="zhezhao">
      <!--背景开始-->
      <div class="bgzhezhao"></div>
      <!--背景结束-->
      <!--头部开始-->
      <div class="header">
        {{dataall.name}}
      </div>
      <!--头部结束-->
      <!--星星开始-->
      <div class="star">
        <span class="starimg"
              v-for="(item,index) in result"
              :key="index">
          <img :src="starimg"
               v-if="index<score"
               alt="">
          <img :src="failstarimg"
               v-if="index>=score"
               alt="">
        </span>

      </div>
      <!--星星结束-->
      <!--优惠信息开始-->
      <div class="youhui">
        <div class="line"></div>
        <div class="text">优惠信息</div>
        <div class="line"></div>
      </div>
      <!--优惠信息结束-->
      <!--优惠信息内容开始-->
      <div class="youhuicontent">
        <div class="youhuiitem"
             v-for="(item,index) in dataall.supports"
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
      <!--优惠信息开始-->
      <div class="youhui">
        <div class="line"></div>
        <div class="text">商家公告</div>
        <div class="line"></div>
      </div>
      <!--优惠信息结束-->
      <!--商家公告内容开始-->
      <div class="gonggaocontent">
        {{dataall.bulletin}}
      </div>
      <!--商家公告内容结束-->
      <!--尾巴开始-->
      <div class="bottom">
        <div class="iconfont icon-guanbi iconstyles"
             @click="flagchange"></div>
      </div>
      <!--尾巴结束-->
    </div>
  </div>
</template>

<script>
import getdata from '@/axios/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '遮罩层',
      dataall: {},
      starimg: require('@/assets/images/star36_on@2x.png'),
      failstarimg: require('@/assets/images/star24_off@3x.png'),
      jianimg: require('@/assets/images/decrease_2@2x.png'),
      zheimg: require('@/assets/images/discount_1@3x.png'),
      teimg: require('@/assets/images/special_1@3x.png'),
      result: 5
    }
  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag'
    }),
    score () {
      // return Math.round(this.dataall.score);
      return 3
    }
  },
  created () {
    this.getseller()
  },
  methods: {
    ...mapMutations({
      changeflag: 'alterflag'
    }),
    flagchange () {
      this.changeflag(false)
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
          _this.dataall = res.data
        }
        console.log(_this.dataall)
      })
    }
  }
}
</script>

<style scoped lang="less">
.weizhi() {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.zhezhao {
  .weizhi();
  overflow: hidden;
  .bgzhezhao {
    .weizhi();
    background: rgba(0, 0, 0, 0.8);
    filter: blur(2px);
    z-index: -1;
  }
  .gonggaocontent {
    width: 80%;
    font-size: 14px;
    font-weight: 200;
    color: rgb(255, 255, 255);
    line-height: 24px;
    margin: 0 auto;
  }
  .youhuicontent {
    width: 80%;
    margin: 0 auto;
    margin-top: 0.48rem;
    overflow: hidden;
    .youhuiitem {
      overflow: hidden;
      height: 0.64rem;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 0.24rem;
      .youhuiicon {
        height: 0.64rem;
        flex: 0 0 0.64rem;
      }
      .text2 {
        font-size: 14px;
        font-weight: 200;
        color: rgb(255, 255, 255);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 0.2rem;
        margin-top: 0.15rem;
      }
    }
  }
  .youhui {
    width: 80%;
    font-size: 20px;
    height: 0.48rem;
    margin: 0 auto;
    margin-top: 0.56rem;
    color: white;
    display: flex;
    flex-flow: row nowrap;
    .line {
      flex: 1;
      height: 0.24rem;
      border-bottom: 1px solid white;
    }
    .text {
      flex: 1;
      height: 0.48rem;
      margin-left: 24px;
      margin-right: 24px;
    }
  }
  .star {
    width: 70%;
    height: 0.96rem;
    margin: 0 auto;
    overflow: hidden;
    .starimg {
      margin-left: 0.2rem;
    }
  }
  .header {
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    color: white;
    margin-top: 1.28rem;
    z-index: 999;
    text-align: center;
  }
  .bottom {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 0.8rem;
    .iconstyles {
      font-size: 28px;
      color: white;
      text-align: center;
    }
  }
}
</style>
