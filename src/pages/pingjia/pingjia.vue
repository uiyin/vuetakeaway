<template>
  <div class="pingjia">
    <Header></Header>
    <Nav></Nav>
    <Rating :dataall="ratingall"></Rating>
    <Zhezhao v-if="gonggaoflag"></Zhezhao>
  </div>
</template>

<script>
import Zhezhao from '@/pages/common/Zhezhao'
import Rating from '@/pages/common/Rating'
import getdata from '@/axios/api.js'
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '列表页',
      rating: []
    }
  },
  created () {
    this.getrating()
  },
  computed: {
    ...mapState(['gonggaoflag']),
    ratingall () {
      let _this = this
      let value = this.rating
      let value2 = value.map((item, index) => {
        let time2 = _this.timestampToTime(item.rateTime)
        item.rateTime = time2
        return item
      })
      return value2
    }
  },
  components: {
    Header,
    Nav,
    Rating,
    Zhezhao
  },
  methods: {
    ...mapMutations(['alterflag']),
    getrating () {
      let _this = this
      let obj = {
        url: '/api/ratings',
        method: 'get',
        data: {}
      }
      getdata(obj).then((res) => {
        if (res.errno === 0) {
          _this.rating = res.data
        }
      })
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = 2018 + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + ' '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change (t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    }
  }
}
</script>

<style scoped lang="less">
.pingjia {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
