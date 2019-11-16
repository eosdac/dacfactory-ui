<template>
  <div class="icons-wrapper">
    <div
      :class="['icon', { 'filled-icon': index <= currentNumber - 1 }]"
      :key="`${icon}-${index}`"
      v-for="(icon, index) in icons"
    >
      <img :src="`../statics/creation/${icon}`" />
    </div>
  </div>
</template>

<script>
// TODO remake key

export default {
  props: {
    currentNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      icons: [
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png",
        "jungle.png"
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.icons-wrapper
  display grid
  grid-template-columns repeat(16, 40px)
  grid-auto-rows 40px
  grid-gap 10px
.icon
  display flex
  justify-content center
  align-items center
  border-radius 4px
  filter grayscale(100%)
  transition 0.3s
.filled-icon
  filter grayscale(0%)
</style>
