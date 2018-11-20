<template>
  <div>
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
      message: '商家页'
    }
  },
  components: {
    Header,
    Nav
  }
}
</script>

<style scoped>
</style>
