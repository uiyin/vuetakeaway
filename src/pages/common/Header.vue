<template>
  <div class="contentall">
    <div class="header">
      <!--背景层开始-->
      <div class="bg">
        <img :src="imgsrc"
             alt=""
             class="bgimg">
      </div>
      <!--背景层结束-->
      <!--内容开始-->
      <div class="avatar">
        <img :src="imgsrc"
             alt=""
             class="bgimgcontent">
      </div>
      <!--右边内容开始-->
      <div class="headercontent">
        <div class="title">
          <img :src="band"
               alt=""
               class="band">
          {{dataall.name}}</div>
        <div class="title2">{{dataall.description}}</div>
        <div class="title3"
             v-for="(item,index) in title3"
             :key="index"
             v-if="index==0">
          <img :src="jianicon"
               alt=""
               class="jianicon">
          {{item.description}}</div>

        <div class="num"
             v-for="(item,index) in title3"
             :key="'num'+index"
             v-if="index===0"
             @click="flagchange"> {{title3.length}}个 </div>
      </div>
      <!--右边内容结束-->
      <!--底部开始-->
      <div class="headerbottom">
        <img :src="gonggao"
             alt=""
             class="gonggao">
        {{dataall.bulletin}}
      </div>
      <!--底部结束-->
      <!--内容结束-->

    </div>
  </div>
</template>

<script>
import getdata from '@/axios/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '头部',
      band: require('@/assets/images/brand@2x.png'),
      jianicon: require('@/assets/images/decrease_2@2x.png'),
      gonggao: require('@/assets/images/bulletin@2x.png'),
      dataall: {}
    }
  },
  created () {
    this.getseller()
  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag'
    }),
    imgsrc () {
      return this.dataall.avatar
    },
    title3 () {
      return this.dataall.supports
    }

  },
  methods: {
    ...mapMutations({
      changeflag: 'alterflag'
    }),
    // 改变状态开始
    flagchange () {
      this.changeflag(true)
      console.log(this.flag)
    },
    // 获取到seller数据
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
      })
    }
  }
}
</script>

<style scoped lang="less">
.over() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contentall {
  overflow: hidden;
  .header {
    width: 100%;
    height: 2.68rem;
    overflow: hidden;
    position: relative;
    .bg {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 2.68rem;
      background: rgba(255, 255, 255, 0.5);
      filter: blur(10px);
      .bgimg {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .avatar {
      position: absolute;
      left: 0.48rem;
      top: 0.48rem;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 4px;
      .bgimgcontent {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .headercontent {
      position: absolute;
      left: 2.08rem;
      top: 0.48rem;
      width: 5.3rem;
      height: 1.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .title {
        font-size: 16px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        line-height: 0.48rem;
        .over();
        .band {
          height: 0.48rem;
          width: auto;
          display: block;
          float: left;
          margin-right: 0.2rem;
        }
      }
      .title2 {
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 12px;
        margin-top: 0.16rem;
        .over();
      }
      .title3 {
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 0.4rem;
        margin-top: 0.16rem;
        .over();
        .jianicon {
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          float: left;
          margin-right: 0.2rem;
        }
      }
      .num {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 0.8rem;
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 12px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        text-align: center;
      }
    }
    .headerbottom {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 0.56rem;
      background: rgba(7, 17, 27, 0.2);
      font-size: 14px;
      line-height: 0.56rem;
      color: white;
      .over();
      .gonggao {
        width: 0.44rem;
        height: 0.24rem;
        display: block;
        float: left;
        margin-top: 0.16rem;
        margin-left: 0.24rem;
        margin-right: 0.08rem;
      }
    }
  }
}
</style>
