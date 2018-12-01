<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="flag"></Zhezhao>
    <!--占位使用这样防止路由过渡时候底部组件上移-->
    <div class="wrapper"
         ref="wrappercontent">
      <Content :dataall="goods"
               @ballmove="getdom"></Content>
    </div>

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

  </div>
</template>

<script>
import Header from '@/pages/common/Header.vue'
import Nav from '@/pages/common/Nav.vue'
import Zhezhao from '@/pages/common/Zhezhao.vue'
import Content from '@/pages/Index/components/Content.vue'
import ShopCar from '@/pages/Index/components/ShopCar'
import BottomShop from '@/pages/Index/components/BottomShopcar'
import GoTop from '@/pages/Index/components/TransitonTop'
import { mapState } from 'vuex'
import getdata from '@/axios/api.js'
export default {
  data () {
    return {
      message: '首页',
      goods: {},
      seller: {},
      shopcarflag: false

    }
  },
  components: {
    Header,
    Nav,
    Zhezhao,
    Content,
    ShopCar,
    BottomShop,
    GoTop
  },
  created () {
    this.getgoods()
    this.getseller()
    let boxheight = document.documentElement.clientHeight
    this.$nextTick(() => {
      let value = boxheight - 174 - 58// 设备减去头部和底部的高度
      this.$refs.wrappercontent.style.height = value + 'px'
    })
  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag',
      shopdata: 'shopcar'
    })

  },
  methods: {
    changeshopcar (content) {
      this.shopcarflag = content
    },
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
      })
    },
    // 获取到传递过来的DOM
    getdom (target) {
      // console.log(target)
      // 获取到了DOM节点了然后传递给shopcar
      // 调用shopcar里面的方法
      this.$refs.shopcar.drop(target)
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  padding-bottom: 1.16rem;
}
</style>
