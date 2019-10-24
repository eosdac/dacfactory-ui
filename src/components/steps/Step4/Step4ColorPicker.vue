<template>
  <section>
    <div class="header">
      <h3>{{ $t("step4.color_palette") }}</h3>
      <button class="random" @click="onRandomColor">{{ $t("step4.random_button") }}</button>
    </div>
    <div class="colors-grid">
      <button
        class="color"
        v-for="{ value, name } in colors"
        :key="value"
        :style="{ borderColor: activeColor === value ? '#979797' : '' }"
        @click="onChooseColor(value)"
      >
        <span>{{ name }} #</span>
        <div class="square" :style="{ backgroundColor: value }" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        { value: "#348aa7", name: "Primary" },
        { value: "#bce784", name: "Secondary" },
        { value: "#d20c67", name: "Warning" },
        { value: "#dbd678", name: "Info" },
        { value: "#7c41ba", name: "Violet" },
        { value: "#b9bdbe", name: "Grey" },
        { value: "#1d2128", name: "DarkHex" },
        { value: "#ebeff1", name: "Positive" },
        { value: "#262b35", name: "Negative" },
        { value: "#ffffff", name: "White" }
      ],
      activeColor: this.$store.state.factory.stepsData[4].color
    };
  },
  methods: {
    onChooseColor(value) {
      this.activeColor = value;
      this.$store.commit("factory/setStepsData", { step: 4, key: "color", data: { value } });
    },
    onRandomColor() {
      const randomColor = Math.floor(Math.random() * this.colors.length);
      const { value } = this.colors[randomColor];

      // const randomHex = (Math.random()*0xFFFFFF<<0).toString(16).padEnd(6, '0');

      this.onChooseColor(value);
    }
  }
};
</script>

<style scoped lang="stylus">
.header
  display flex
  justify-content space-between
  align-items center
  margin 4px 8px 14px 0
h3
  margin 0
  font-size 18px
  font-weight 500
  letter-spacing 0.4px
  line-height 21px
  color $medium-violet
.random
  padding 10px
  font-size 16px
  font-weight 700
  line-height 19px
  color $secondary
  transition color 0.2s
  &:hover,
  &:focus
    color $medium-violet
.colors-grid
  display grid
  grid-template-columns 1fr 1fr
  grid-gap 22px
.color
  display flex
  justify-content space-between
  align-items center
  height 50px
  padding 0 15px
  border 1px solid #eceff1
  border-radius 4px
  color #ffffff
  transition border-color 0.2s
  &:hover,
  &:focus
    border-color #979797
.square
  width 22px
  height 22px
  margin-left 5px
  border 1px solid #979797
</style>
