<template>
  <section>
    <div class="header">
      <h3>{{ $t("step4.colors_scheme") }}</h3>
    </div>
    <div class="color-picker-wrapper">
      <q-color dark no-header no-footer class="color-picker-left" @input="onQColorInput" :value="activeColor" />
      <div class="color-picker-right">
        <div v-for="(scheme, index) in schemes" class="schemes-wrapper">
          <label class="scheme-text">
            <q-radio dark keep-color v-model="activeIndex" :val="index" />Scheme {{ index + 1 }}
          </label>
          <div class="colors-scheme">
            <div class="color-square" v-for="color in scheme" :style="{ backgroundColor: `#${color}` }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ColorScheme from "color-scheme";
import debounce from "lodash.debounce";

import { SCHEME_VARIATIONS } from "components/constants";

export default {
  data() {
    const { activeColor, activeIndex } = this.$store.state.factory.stepsData[4].colorsScheme;

    return {
      schemes: [],
      activeColor,
      activeIndex
    };
  },
  created() {
    this.generateColorsSchemes();
  },
  methods: {
    onQColorInput: debounce(function(color) {
      this.activeColor = color;
    }, 100),
    generateColorsSchemes() {
      const scheme = new ColorScheme()
        .from_hex(this.activeColor.replace("#", ""))
        .scheme("triade")
        .distance(0.1)
        .web_safe(true);
      this.schemes = SCHEME_VARIATIONS.map(currentVariation =>
        scheme
          .variation(currentVariation)
          .colors()
          .slice(0, 10)
      );
      this.setColorsScheme();
    },
    setColorsScheme() {
      this.$store.commit("factory/setStepsData", {
        step: 4,
        key: "colorsScheme",
        data: {
          value: {
            scheme: this.schemes[this.activeIndex],
            activeIndex: this.activeIndex,
            activeColor: this.activeColor
          }
        }
      });
    }
  },
  watch: {
    activeColor() {
      this.generateColorsSchemes();
    },
    activeIndex() {
      this.setColorsScheme();
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
.color-picker-wrapper
  display flex
  @media (max-width 1139px), (min-width 1439px)
    flex-direction column
.color-picker-left
  width 100%
.color-picker-right
  margin-left 14px
  @media (max-width 1139px), (min-width 1439px)
    margin 14px 0 0
.schemes-wrapper
  display flex
  &:not(:last-child)
    margin-bottom 14px
.scheme-text
  display flex
  align-items center
  margin 0 10px 0 0
  cursor pointer
  color rgba(255, 255, 255, 0.7)
  white-space nowrap
.colors-scheme
  display grid
  grid-template-columns repeat(5, 20px)
  grid-template-rows 20px 20px
  grid-gap 8px
  @media (max-width 1139px), (min-width 1439px)
    grid-template-columns repeat(auto-fill, 20px)
    grid-template-rows none
    grid-auto-rows 20px
    align-content center
    width 100%
.color-square
  border 1px solid rgba(255, 255, 255, 0.7)
  border-radius 2px
</style>
