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
// TODO remake key and set needed icons

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
  justify-content center
  margin-bottom 30px
  @media (max-width 809px)
    grid-template-columns repeat(auto-fill, 40px)
    width 100%
  @media (max-width 479px)
    grid-template-columns repeat(auto-fill, 36px)
    grid-auto-rows 36px
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
