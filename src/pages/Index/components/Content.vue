<template>
  <div class="content">
    <!--左边开始-->
    <div class="menubox"
         ref="menuwrapper">
      <ul class="menuwrapper"
          ref="boxwrapper">
        <li v-for="(item,index) in dataall"
            :key="index"
            :class="[index==activeMenu?'menuitem active':'menuitem']"
            @click="changeactive(index)">
          <div class="cellbox">
            <img :src="jianimg"
                 alt=""
                 class="youhuiicon"
                 v-if="item.type==2">
            <img :src="zheimg"
                 alt=""
                 class="youhuiicon"
                 v-else-if="item.type==1">
            <img :src="teimg"
                 alt=""
                 class="youhuiicon"
                 v-else-if="item.type==-1||3||4">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <!--左边结束-->
    <!--右边开始-->
    <div class="contentright"
         ref="contentwrapper">
      <div class="contentwrapper"
           ref="contentall">
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
                  <!--小球组件开始-->
                  <ShopBall @ballmove="balldo"></ShopBall>
                  <!--小球组件结束-->
                </div>
              </div>

            </li>
          </ul>
        </div>
      </div>

    </div>
    <!--右边结束-->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopBall from '@/pages/common/ShopBall'
export default {
  data () {
    return {
      message: '内容',
      jianimg: require('@/assets/images/decrease_2@2x.png'),
      zheimg: require('@/assets/images/discount_1@3x.png'),
      teimg: require('@/assets/images/special_1@3x.png'),
      heightall: [],
      scrollY: 0, // 用户滚动的距离
      guoduIndex: 0, // 为了和activeMenu过渡使用
      topMenu: 0 // 滚动到第四个以后菜单要滚动的距离
    }
  },
  props: ['dataall'],
  components: {
    ShopBall
  },
  mounted () {
    let _this = this
    this.initbetterscroll()
    this.initbetterscrollcontent()
    // 等待页面渲染完毕
    setTimeout(() => {
      _this.getallHeight()
    }, 1000)
  },
  computed: {
    activeMenu () {
      let _this = this
      let box = this.$refs.boxwrapper
      let wrapper = this.$refs.menuwrapper
      this.$nextTick(function () {
        let value = box.offsetHeight - wrapper.offsetHeight
        _this.topMenu = value
      })
      for (let i = 0; i < this.heightall.length; i++) {
        let first = this.heightall[i]
        let last = this.heightall[i + 1]
        if ((this.scrollY >= first && this.scrollY < last) || !last) {
          if (i >= 4) {
            box.style['transition-duration'] = '1s'
            box.style.transform = 'translate(0px,-' + _this.topMenu + 'px)'
          } else if (i < 4) {
            box.style['transition-duration'] = '1s'
            box.style.transform = 'translate(0px,0px)'
          }
          return i
        }
      }
      return 0
    }
  },
  methods: {
    initbetterscroll () {
      let _this = this
      this.$nextTick(function () {
        let wrapper = _this.$refs.menuwrapper
        _this.scroll = new BScroll(wrapper, {
          click: true,
          bounce: {
            top: false,
            bottom: false
          }
        })
      })
    },
    initbetterscrollcontent () {
      let _this = this
      this.$nextTick(function () {
        let wrapper = _this.$refs.contentwrapper
        _this.scrollall = new BScroll(wrapper, {
          probeType: 3, // 这个属性必须有
          bounce: {
            top: false,
            bottom: false
          }
        })
        _this.scrollall.on('scroll', (obj) => {
          _this.scrollY = -Math.ceil(obj.y)
        })
      })
    },
    getallHeight () {
      let _this = this
      this.$nextTick(() => {
        let heightall = [0]
        let height = 0
        let content = this.$refs.contentall.getElementsByClassName('contentitem')
        for (let i = 0; i < content.length; i++) {
          height += content[i].offsetHeight
          heightall.push(height)
        }
        _this.heightall = heightall
        console.log(_this.heightall)
      })
    },
    changeactive (index) {
      let wrapper = this.$refs.contentall.getElementsByClassName('contentitem')
      this.scrollall.scrollToElement(wrapper[index], 300)
    },
    // 小球运动
    balldo (target) {
      // console.log(target)
      // 在发射出去到购物车那个大环境下
      this.$emit('ballmove', target)
    }
  }
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  left: 0px;
  top: 3.48rem;
  bottom: 1.16rem;
  right: 0px;
  z-index: -2;
  //左边
  .menubox {
    flex: 0 0 2.24rem;
    height: 100%;
    background: #f3f5f7;
    overflow: hidden;
    .menuwrapper {
      .menuitem {
        display: table;
        padding: 0 0.2rem;
        height: 1.08rem;
        &.active {
          background: #0190d4;
          color: rgb(255, 255, 255) !important;
        }
        .cellbox {
          display: table-cell;
          vertical-align: middle;
          width: 1.8rem;
          padding: 0.2rem 0rem;
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          font-weight: 200;
          line-height: 28px;
          overflow: hidden;
          .youhuiicon {
            width: 0.4rem;
            height: 0.4rem;
            display: block;
            float: left;
            margin-top: 2px;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
  //右边
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
      padding: 0.36rem 0.16rem;
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
          position: relative; //给小球
          .title {
            font-size: 18px;
            color: rgb(7, 17, 27);
            line-height: 24px;
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
}
</style>
