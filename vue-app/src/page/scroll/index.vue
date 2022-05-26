<template>
  <div class="index">
    <scroll-view
      @pull-up="onPageBottom"
      @pull-down="onPageTop"
      ref="scrollView">
      <div
          v-for="(item, index) in showList"
          :key="index"
          class="list-item">{{ item }}</div>
    </scroll-view>
  </div>
</template>

<script>
/* eslint-disable */
import ScrollView from '@/components/scroll-view'

export default {
  name: 'Index',
  data () {
    return {
      list: new Array(10000).fill(0).map((item, index) => ('内容' + (index + 1))),
      showList: [],
      cellHeight: 0,
      showCount: 0
    }
  },
  components: {
    ScrollView
  },
  mounted() {
    this.initData()
  },
  methods: {
    onPageBottom () {
      console.log('底部触发')
      // 每次触发加载10条数据
    },
    onPageTop () {
      console.log('顶部触发')
      this.trueList = this.list.slice(0, 20)
    },
    // 初始化基本参数
    initData() {
      let containerDom = this.$refs.scrollView.$el
      let contentBoxDom = this.$refs.scrollView.$refs.viewContainer
      let cell = document.querySelector('.list-item')
      // 盒子高度
      let containerDomHeight = containerDom.clientHeight
      console.log(cell, '===')
// 每行高度
//       this.cellHeight = cell.clientHeight
//       // 可视框需要显示的数据量
//       this.showCount = Math.ceil(containerDomHeight / this.cellHeight)
//       // 滚动盒子的高度
//       contentBoxDom.style.height = this.cellHeight * this.list.length + 'px'
//
//       // 实现虚拟滚动
//       this.initScrolLoad(containerDom)
//       containerDom.onscroll = () => {
//         this.initScrolLoad(containerDom)
//       }
    },
    // 实现虚拟滚动
    initScrolLoad(containerDom) {
      // 滚动出去的距离
      let scrollTop = containerDom.scrollTop
      // 可视区域第一行索引(-2: 往上多渲染两条数据)
      let startIndex = Math.floor(scrollTop / this.cellHeight) - 2
      // 可视区域最后一行索引(+4: 往下多渲染两条数据(要算上上面的-2))
      let endIndex = startIndex + this.showCount + 4

      // 获取需要渲染的数据
      this.showList = []
      for (let i = startIndex; i < endIndex; i++) {
        this.showList.push({
          data: this.list[i],
          // 算好每个元素需要的top值
          top: i * this.cellHeight + 'px'
        })
      }
      // console.log(startIndex, endIndex)
    },
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  &:nth-child(odd) {
    background-color: #abcdef;
  }
}
</style>
