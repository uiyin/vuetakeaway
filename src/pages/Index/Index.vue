<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="flag"></Zhezhao>
    <div class="content">
      <LeftMenu :dataall="goods"></LeftMenu>
      <RightContent :dataall="goods"></RightContent>
    </div>

  </div>
</template>

<script>
import Header from '@/pages/common/Header.vue'
import Nav from '@/pages/common/Nav.vue'
import Zhezhao from '@/pages/common/Zhezhao.vue'
import LeftMenu from '@/pages/Index/components/MenuLeft.vue'
import RightContent from '@/pages/Index/components/ContentRight.vue'
import { mapState } from 'vuex'
import getdata from '@/axios/api.js'
export default {
  data () {
    return {
      message: '首页',
      goods: {}
    }
  },
  components: {
    Header,
    Nav,
    Zhezhao,
    LeftMenu,
    RightContent
  },
  created () {
    this.getgoods()
  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag'
    })
  },
  methods: {
    getgoods () {
      let _this = this
      let obj = {
        url: '/api/goods',
        method: 'get',
        data: {}
      }
      getdata(obj).then((res) => {
        if (res.errno === 0) {
          _this.goods = res.data
        }
        console.log(_this.goods)
      })
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
}
</style>
