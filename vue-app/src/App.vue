<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
    this.initGlobalLoading()
    this.initGlobalTips()
  },
  methods: {
    initGlobalLoading() {
      let loading = null
      window.showLoading = () => {
        loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)',
        })
      }
      window.hideLoading = () => {
        if (loading) loading.close()
      }
    },
    initGlobalTips() {
      // type = info,success,warning,error,loading
      window.showTips = (message, type = 'success') => {
        this.$message({
          type,
          message,
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#app {
}
</style>
