<template>
  <div>
    <p>component B: {{ count }}</p>
    <C
        :count="count"
        @handle-count-changed="handleCountChanged"/>
  </div>
</template>

<script>
import C from '@/components/C'

export default {
  props: {
    count: {
      type: Number
    }
  },
  components: {
    C
  },
  methods: {
    handleCountChanged(type) {
      this.$emit('handle-count-changed', type)
    }
  }
}
</script>

<style scoped>

</style>