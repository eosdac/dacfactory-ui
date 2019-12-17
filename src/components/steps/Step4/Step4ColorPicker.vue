<template>
  <section>
    <div class="header">
      <h3>{{ $t("step4.colors_scheme") }}</h3>
    </div>
    <div class="color-picker-wrapper">
      <q-color dark no-header no-footer class="color-picker" v-model="hex" />
      <div class="color-picker-right">
        <div v-for="(scheme, index) in schemes" class="schemes-wrapper">
          <p><q-radio v-model="activeIndex" :val="index" />Scheme {{ index + 1 }}</p>
          <div v-for="color in scheme" :style="{ backgroundColor: `#${color}`, width: '20px', height: '20px' }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ColorScheme from "color-scheme";

export default {
  data() {
    return {
      hex: "#000000",
      schemes: [],
      activeIndex: this.$store.state.factory.stepsData[4].colorsScheme.activeIndex
    };
  },
  created() {
    this.generateColorsSchemes();
    if (!this.$store.state.factory.stepsData[4].colorsScheme.scheme.length) {
      this.setColorsScheme();
    }
  },
  methods: {
    generateColorsSchemes() {
      const scheme = new ColorScheme()
        .from_hex(this.hex.replace("#", ""))
        .scheme("triade")
        .distance(0.1)
        .web_safe(true);
      this.schemes = [
        scheme.variation("pastel").colors(),
        scheme.variation("pale").colors(),
        scheme.variation("soft").colors()
      ];
    },
    setColorsScheme() {
      this.$store.commit("factory/setStepsData", {
        step: 4,
        key: "colorsScheme",
        data: { value: {scheme: this.schemes[this.activeIndex], activeIndex: this.activeIndex} }
      });
    }
  },
  watch: {
    hex() {
      this.generateColorsSchemes();
    },
    activeIndex() {
      this.setColorsScheme()
    }
  }
};
</script>

<style scoped lang="stylus">
.header
  display flex
  justify-content space-between
  align-items center
  margin 4px 0 14px
h3
  margin 0
  font-size 18px
  font-weight 500
  letter-spacing 0.4px
  line-height 21px
  color $medium-violet
.colors-grid
  display grid
  grid-template-columns 1fr 1fr
  grid-gap 22px
  justify-items center
.color-picker-wrapper
  display flex
.color-picker
  flex-grow 2
.color-picker-right
  flex-grow 1
  margin-left 14px
.schemes-wrapper
  display flex
</style>
