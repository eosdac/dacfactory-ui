<template>
  <section>
    <div class="header">
      <h3>{{ $t("step4.colors_scheme") }}</h3>
    </div>
    <div class="colors-grid">
      <q-radio dark v-model="colorsScheme" val="light" label="Light" />
      <q-radio dark v-model="colorsScheme" val="dark" label="Dark" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colorsScheme: this.$store.state.factory.stepsData[4].colorsScheme
    };
  },
  watch: {
    colorsScheme(value) {
      this.$store.commit("factory/setStepsData", { step: 4, key: "colorsScheme", data: { value } });
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
.colors-grid
  display grid
  grid-template-columns 1fr 1fr
  grid-gap 22px
  justify-items center
</style>
