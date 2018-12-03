<template>
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
        <div v-if="item.recommend"
             class="spanboxall">
          <div v-for="(item2,index2) in item.recommend"
               class="spanbox"
               :key="index2">
            {{item2}}
          </div>
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
        <div v-if="item.recommend"
             class="spanboxall">
          <div v-for="(item2,index2) in item.recommend"
               class="spanbox"
               :key="index2">
            {{item2}}
          </div>
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
        <div v-if="item.recommend"
             class="spanboxall">
          <div v-for="(item2,index2) in item.recommend"
               class="spanbox"
               :key="index2">
            {{item2}}
          </div>
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
        <div v-if="item.recommend"
             class="spanboxall">
          <div v-for="(item2,index2) in item.recommend"
               class="spanbox"
               :key="index2">
            {{item2}}
          </div>
        </div>
      </li>
      <!--推荐与吐槽下面有评论和没有评论的结束-->
    </ul>
    <!--评论合集结束-->
  </div>
  <!--商品评价结束-->
</template>

<script>
export default {
  data () {
    return {
      message: '评论',
      dataflag: false, // 为了选择有用户评论还是没有评论的
      kouwei: 2 // 默认是2选择的就是全部 2就是全部 0 就是推荐 1就是吐槽
    }
  },
  created () {
    console.log(this.dataall)
  },
  computed: {
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
      return this.dataall
    }
  },
  props: ['dataall'],
  methods: {
    choosekouwei (value) {
      this.kouwei = value
    },
    changedata () {
      this.dataflag = !this.dataflag
    }

  }
}
</script>

<style scoped lang="less">
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
    .spanboxall {
      overflow: hidden;
      .spanbox {
        font-size: 14px;
        padding: 0.12rem 0.12rem;
        text-align: center;
        line-height: 20px;
        color: #777;
        border: 1px solid #ccc;
        margin-right: 0.2rem;
        float: left;
        margin-top: 0.2rem;
        border-radius: 5px;
      }
    }
  }
}
</style>
