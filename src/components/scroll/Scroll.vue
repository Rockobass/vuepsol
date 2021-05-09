<template>
  <div class="wrapper" ref="wrapper">
    <div><slot></slot></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        // console.log('---')
        this.scroll && this.scroll.refresh()
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      if (this.probeType === 2 || this.probeType ===3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }

      //监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>

</style>
