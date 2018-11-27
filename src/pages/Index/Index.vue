<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="flag"></Zhezhao>
    <Content :dataall="goods"></Content>
    <ShopCar :dataall="shopdata"
             :sellercontent="seller"></ShopCar>
  </div>
</template>

<script>
import Header from '@/pages/common/Header.vue'
import Nav from '@/pages/common/Nav.vue'
import Zhezhao from '@/pages/common/Zhezhao.vue'
import Content from '@/pages/Index/components/Content.vue'
import ShopCar from '@/pages/Index/components/ShopCar'
import { mapState } from 'vuex'
import getdata from '@/axios/api.js'
export default {
  data () {
    return {
      message: '首页',
      goods: {},
      seller: {}
    }
  },
  components: {
    Header,
    Nav,
    Zhezhao,
    Content,
    ShopCar
  },
  created () {
    this.getgoods()
    this.getseller()
  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag',
      shopdata: 'shopcar'
    })
  },
  methods: {
    changeIndex (content) {
      this.signal = content
    },
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
</style>
