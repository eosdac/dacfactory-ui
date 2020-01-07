<template>
  <section>
    <div class="header">
      <h3>{{ $t("step4.color_scheme") }}</h3>
    </div>
    <div class="color-picker-wrapper">
      {{primary}} {{secondary}}
      <q-btn push :style="`background: ${primary}`" class="q-pa-md" :label="$t('step4.primary_color')">
        <q-popup-proxy>
          <q-color dark no-footer class="color-picker-left" @input="onQColorInput" :value="primary" />
        </q-popup-proxy>
      </q-btn>
    </div>
    <div>
      <q-toggle :label="$t('step4.dark_theme')" v-model="isDark" />
    </div>
  </section>
</template>

<script>
import ColorScheme from "color-scheme";
import debounce from "lodash.debounce";

export default {
  data() {
    let { primary } = this.$store.state.factory.stepsData[4].colorScheme;
    if (!primary) {
      primary = '#7c41ba';
    }

    return {
      schemes: [],
      primary,
      secondary: null,
      isDark: true
    };
  },
  created() {
    this.generateColorSchemes();
  },
  methods: {
    onQColorInput: debounce(function(color) {
      this.primary = color;
    }, 100),
    generateColorSchemes() {
      const secondary = new ColorScheme()
              .from_hex(this.primary.replace("#", ""))
              .scheme("mono")
              .variation('hard')
              .colors()[1];

      this.secondary = `#${secondary}`

      this.setColorScheme();
    },
    setColorScheme() {
      this.$store.commit("factory/setStepsData", {
        step: 4,
        key: "colorScheme",
        data: {
          value: {
            primary: this.primary,
            secondary: this.secondary,
            isDark: this.isDark
          }
        }
      });
    }
  },
  watch: {
    primary() {
      this.generateColorSchemes();
    },
    isDark() {
      this.setColorScheme();
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
