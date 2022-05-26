<template>
  <div class="scroll-view">
    <div class="top-tip">下拉刷新...</div>
    <div
        @touchstart="touchStart"
        @scroll="virtualScroll"
        :style="{
          transform: `translateY(${translateY}px)`
        }"
        ref="viewContainer"
        class="view-container">
      <slot/>
    </div>
    <div class="bottom-tip">上拉加载...</div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "index",
  data() {
    return {
      translateY: 0,
    }
  },
  methods: {
    touchStart(e) {
      let start = e.touches[0].clientY
      let end
      let translateY
      // 开始触摸时的滚动高度
      const startTop = this.$refs.viewContainer.scrollTop
      const view = this.$refs.viewContainer
      // 开始触摸到结束滚过的高度
      const startScrollHeight = view.scrollHeight - (startTop + view.clientHeight)
      document.ontouchmove = (e) => {
        end =  e.touches[0].clientY
        if (end > start) {
          // 下拉刷新
          // 没有到顶不触发
          if (view.scrollTop > 0) return
          translateY = end - start - startTop
          this.translateY = translateY > 80 ? 80 : translateY
        }
        if (end < start) {
          // 上拉加载
          // 没有滚动条，无需触发
          if (view.scrollHeight === view.clientHeight) return
          // 没有滚动到底部不触发
          if (view.scrollHeight > view.scrollTop + view.clientHeight) return
          translateY = end - start + startScrollHeight
          this.translateY = translateY < -80 ? -80 : translateY
        }
      }
      document.ontouchend = () => {
        document.ontouchmove = null
        if (translateY > 80) {
          this.$emit('pull-down')
        }
        if (translateY < -80) {
          this.$emit('pull-up')
        }
        this.translateY = 0
      }
    },
    virtualScroll() {
      this.$emit('on-scroll', this.$refs.viewContainer)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-view {
  position: relative;
  height: 100vh;
  transition: transform 0.2s;
  .top-tip, .bottom-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .top-tip {
    position: absolute;
    top: 0;
    left: 0;
  }
  .bottom-tip {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .view-container {
    height: 100%;
    overflow: auto;
    background-color: #FFFFFF;
  }
}
</style>