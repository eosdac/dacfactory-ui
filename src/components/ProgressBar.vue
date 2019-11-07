<template>
  <div class="wrapper">
    <div class="loading-line" :style="{ transform: `translateX(-${100 - filled * 100}%)` }"></div>
  </div>
</template>

<script>
export default {
  props: {
    filled: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper
  width 100%
  height 40px
  border-radius 6px
  overflow hidden
  background-color $light-violet
.loading-line
  width 100%
  height 100%
  background-color $primary
  transition transform .2s
</style>
