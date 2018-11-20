<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Zhezhao v-if="flag"></Zhezhao>
  </div>
</template>

<script>
import Header from '@/pages/common/Header.vue'
import Nav from '@/pages/common/Nav.vue'
import Zhezhao from '@/pages/common/Zhezhao.vue'
import { mapState } from 'vuex'
// import getdata from '@/axios/api.js'
export default {
  data () {
    return {

      message: '首页'
    }
  },
  components: {
    Header,
    Nav,
    Zhezhao
  },
  created () {

  },
  computed: {
    ...mapState({
      flag: 'gonggaoflag'
    })
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
