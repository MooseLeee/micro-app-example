<template>
  <section class="main-container">
    <section class="container-right">
      <slot name="right"/>
    </section>
    <slot name="left"/>
  </section>
</template>

<script>
export default {
  name: 'DankalToolbar',
}
</script>

<style lang="scss" scoped>
  .main-container{
    /*min-height: 40px;*/
    .container-right{
      position: relative;
      float: right;
      z-index: 100;
    }
  }
</style>
