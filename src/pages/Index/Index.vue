<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="flag"></Zhezhao>
    <Content :dataall="goods"></Content>

  </div>
</template>

<script>
import Header from '@/pages/common/Header.vue'
import Nav from '@/pages/common/Nav.vue'
import Zhezhao from '@/pages/common/Zhezhao.vue'
import Content from '@/pages/Index/components/Content.vue'
import { mapState } from 'vuex'
import getdata from '@/axios/api.js'
export default {
  data () {
    return {
      message: '首页',
      goods: {},
      signal: false
    }
  },
  components: {
    Header,
    Nav,
    Zhezhao,
    Content
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
    }
  }
}
</script>

<style scoped lang="less">
</style>
