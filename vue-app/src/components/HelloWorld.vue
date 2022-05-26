<template>
  <div class="hello"  @touchend='touchEnd($event)' @touchstart='touchStart($event)' @touchmove='touchMove($event)'>
    <div class="header">{{refreshText}}</div>
    <div class="list-box" ref="hello">
        <div class="list" ref="list" v-for="(item,index) in showList" :key="index">{{item}}</div>
        <div class="footer">{{loadingText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showList: [],
      isShowTop: 0,
      startX: '',
      startY: '',
      endX: '',
      endY: '',
      num: 0,
      refreshText: '刷新',
      loadingText: '加载更多',
      paddingTop: '',
      oldList: ''
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {}
    }
  },
  watch: {
    value (val) {
      val.forEach((item, index) => {
        console.log(index, this.oldList.length, '===')

        if (index >= this.oldList.length) { // 添加每次的10条新数据
          this.showList.push(item)
        }
      })
      if (this.showList.length > 40) {
        this.paddingTop = Number(this.paddingTop) + 300
        this.$refs.hello.style.paddingTop = this.paddingTop + 'px'
        this.showList.splice(0, 10)
      }
      console.log(val, this.showList, '===========')
      this.oldList = JSON.parse(JSON.stringify(val))
    }
  },
  created () {
    window.onscroll = () => {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      this.isShowTop = scrollTop
      if (scrollTop + windowHeight === scrollHeight) {
      // 写后台加载数据的函数
        this.$emit('onPageBottom')
        console.log('距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight)
      }
    }
  },
  mounted () {
    this.showList = JSON.parse(JSON.stringify(this.value))
    this.oldList = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    touchStart (e) {
      this.startY = e.touches[0].pageY
    },
    touchMove (e) {
      this.endY = e.changedTouches[0].pageY
      if (this.endY - this.startY > 0) {
        console.log('下拉')
        if (this.isShowTop === 0) {
          console.log('回到顶部')
          this.num += 1
          console.log(this.listnum, '=======')
          this.$refs.hello.style.transform = `translateY(${this.num > 50 ? 50 : this.num}px)`
          this.$refs.hello.style.transition = '.5s'
          if (this.num > 50) {
            this.refreshText = '松开刷新'
          } else {
            this.refreshText = '刷新'
          }
        }
      } else {
        console.log('上拉')
      }
    },
    touchEnd () {
      this.$refs.hello.style.transform = `translateY(0px)`
      this.$refs.hello.style.transition = '.5s'
    //   console.log(e)
    //   this.endX = e.changedTouches[0].pageX
    }
  }
}
</script>

<style scoped>
.header{
  height: 30px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.hello{
    position: relative;
  /* transform: translateY(-30px); */
}
.list-box{
    width: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 1;
}
.list{
  background: #abcdef;
  height: 60px;
  line-height: 60px;
}
.list:nth-of-type(odd){
  background: #fff;
}
</style>
