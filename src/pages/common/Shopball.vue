<template>
  <div class="shopball">
    <Ballmove>
      <div class="desc"
           v-show="count>0"
           slot="jianfa"
           @click="desc">-</div>
    </Ballmove>
    <div class="count"
         v-show="count>0">{{count}}</div>
    <div class="add"
         @click="add($event)">+</div>
  </div>
</template>

<script>
import Ballmove from '@/pages/common/Ballmove'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      message: '小球',
      count: 0
    }
  },
  computed: {
    ...mapState({
      shopcarcontent: 'shopcar'
    })
  },
  methods: {
    ...mapMutations(['changeshopcar']),
    add (e) {
      // console.log(e)
      this.count++
      // 把自定义事件和自己这个元素发射出去 说白了也就是这个元素<div data-v-47756ef6 class="add">+</div>
      this.$emit('ballmove', e.target)
    },
    desc () {
      this.count--
    }
  },
  components: {
    Ballmove
  }

}
</script>

<style scoped lang="less">
.shopball {
  position: absolute;
  right: 0.1rem;
  bottom: 0px;
  font-size: 20px;
  .add,
  .desc {
    width: 0.48rem;
    color: #fff;
    line-height: 0.46rem;
    height: 0.48rem;
    border-radius: 50%;
    background: #0190d4;
    text-align: center;
    float: left;
  }
  .count {
    width: 0.48rem;
    color: #777;
    line-height: 0.46rem;
    height: 0.48rem;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    float: left;
  }
}
</style>
