<template>
  <div>
    <p>component C: {{ count }}</p>
    <button @click="changeCount('increase')">+</button>
    &nbsp;
    <button @click="changeCount('decrease')">-</button>
    <p>store name: {{ name }}</p>
    <button @click="changeName()">change store name</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    count: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['name']),
  },
  methods: {
    ...mapMutations(['changeName']),
    changeCount(type) {
      this.$emit('handle-count-changed', type)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>