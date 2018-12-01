<template>
  <div class="pingjia">
    <Header></Header>
    <Nav></Nav>
    {{message}}
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
export default {
  data () {
    return {
      message: '列表页'
    }
  },
  components: {
    Header,
    Nav
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
