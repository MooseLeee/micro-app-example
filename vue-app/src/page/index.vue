<template>
  <div class="container">
    <div>
      <h1>Hello, world!</h1>
      <div
          v-for="item in persons"
          :key="item.id">My name is {{ item.name }}, I'm {{ item.age }} years old.</div>
      <p v-if="persons.length">total num: {{ persons.length }}, total age: {{ totalAge }}</p>
      <p
          v-else
          ref="none">none</p>
      <button @click="reducePeople()">Reduce</button>
      <p>store name: {{ name }}</p>
      <button @click="changeName()">change store name</button>
    </div>
    <div>
      <A/>
    </div>
  </div>
</template>

<script>
import A from '@/components/A'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      persons: [
        { id: 1, name: 'Tom', age: 15 },
        { id: 2, name: 'Mike', age: 25 },
        { id: 3, name: 'Jerry', age: 35 },
        { id: 4, name: 'Andy', age: 45 },
      ]
    }
  },
  computed: {
    ...mapGetters(['name']),
    totalAge() {
      return this.persons.map(i => i.age).reduce((a, b) => (a + b))
    }
  },
  components: {
    A
  },
  watch: {
    'persons.length'(n, o) {
      console.log('persons length changed...', n, o)
    }
  },
  methods: {
    ...mapMutations(['changeName']),
    reducePeople() {
      this.persons.splice(0, 1)
      if (!this.persons.length) {
        this.$nextTick(() => {
          this.$refs.none.className = 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  text-align: center;
  font-size: 16px;
  div {
    flex: 1;
  }
  p {
    color: #838385;
    &.none {
      font-size: 30px;
      font-weight: bold;
      color: #FF0000;
    }
  }
}
</style>