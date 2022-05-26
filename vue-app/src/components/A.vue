<template>
  <div>
    <p>component A: {{ count }}</p>
    <B
        :count="count"
        @handle-count-changed="handleCountChanged"/>
  </div>
</template>

<script>
import B from '@/components/B'

export default {
  data() {
    return {
      count: 0
    }
  },
  components: {
    B
  },
  methods: {
    handleCountChanged(type) {
      switch (type) {
        case 'increase':
          this.count++
          break
        case 'decrease':
          this.count--
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>