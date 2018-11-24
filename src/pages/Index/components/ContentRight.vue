<template>
  <div class="contentright"
       ref="contentwrapper">
    <div class="contentwrapper">
      <div class="contentitem"
           v-for="(item,index) in dataall"
           :key="index">
        <h1 class="sellerheader">{{item.name}}</h1>
        <ul>
          <li v-for="(item2,index2) in item.foods"
              :key="index2"
              class="itemclass">
            <div :class="[index2!=(item.foods.length-1)?'itemcontentall borderactive':'itemcontentall']">
              <img :src="item2.icon"
                   class="imgicon"
                   alt="">
              <div class="rightcontent">
                <p class="title">{{item2.name}}</p>
                <p class="info">{{item2.description}}</p>
                <p class="sellcount">月售{{item2.sellCount}}份 <span class="haoping"> 好评率{{item2.rating}}%</span></p>
                <p class="newprice">￥{{item2.price}} <span class="oldprice"
                        v-show="item2.oldPrice"> ￥{{item2.oldPrice}}</span></p>

              </div>
            </div>

          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      message: '右边内容'
    }
  },
  props: ['dataall'],
  created () {
    let _this = this
    this.$nextTick(function () {
      let wrapper = _this.$refs.contentwrapper
      this.scroll = new BScroll(wrapper, {

        bounce: {
          top: false,
          bottom: false
        }
      })
    })
  }
}
</script>

<style scoped lang="less">
.contentright {
  flex: 1;
  height: 100%;
  overflow: hidden;
  .sellerheader {
    width: 100%;
    height: 0.52rem;
    line-height: 0.52rem;
    font-size: 16px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
    text-indent: 0.28rem;
  }
  .itemclass {
    background: white;
    padding: 0.36rem 0.36rem;
    padding-bottom: 0px;
    .itemcontentall {
      display: flex;
      flex-flow: row nowrap;
      padding-bottom: 0.4rem;
      &.borderactive {
        border-bottom: 1px solid #ccc;
      }
      .imgicon {
        flex: 0 0 1.6rem;
        height: 1.6rem;
      }
      .rightcontent {
        flex: 1;
        margin-left: 0.2rem;
        .title {
          font-size: 18px;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
        .info {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 20px;
          margin-top: 0.2rem;
        }
        .sellcount {
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 20px;
        }
        .newprice {
          font-size: 18px;
          color: rgb(255, 0, 0);
          font-weight: normal/700;
          line-height: 20px;
          margin-top: 0.2rem;
          .oldprice {
            font-size: 12px;
            color: rgb(147, 153, 159);
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
