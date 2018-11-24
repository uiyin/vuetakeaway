<template>
  <div class="menubox"
       ref="menuwrapper">
    <ul class="menuwrapper">
      <li v-for="(item,index) in dataall"
          :key="index"
          :class="[index==classname?'menuitem active':'menuitem']">
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
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      message: '菜单',
      jianimg: require('@/assets/images/decrease_2@2x.png'),
      zheimg: require('@/assets/images/discount_1@3x.png'),
      teimg: require('@/assets/images/special_1@3x.png'),
      classname: 0
    }
  },
  props: ['dataall'],
  created () {
    let _this = this
    this.$nextTick(function () {
      let wrapper = _this.$refs.menuwrapper
      this.scroll = new BScroll(wrapper, {

        bounce: {
          top: false,
          bottom: false
        }
      })
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
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
          margin-top: 0.1rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
