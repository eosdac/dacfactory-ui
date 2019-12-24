<template>
  <div>
    <h2 class="title-step">{{ $t("step5.title_right") }}</h2>
    <div v-if="!customDacData">
      <p class="hint-step text-uppercase break-text-hyphens">{{ $t("step1.dac_name") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step1.dacName }}</p>
      <p class="hint-step text-uppercase">{{ $t("step1.token_symbol") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step1.tokenSymbol }}</p>
      <p class="hint-step text-uppercase">{{ $t("step1.description") }}</p>
      <p class="subtitle-step margin-bottom-15 break-text-hyphens">{{ step1.dacDescription }}</p>
      <custom-divider compClass="divider" />
      <p class="hint-step text-uppercase">{{ $t("step2.issuance") }} {{ step1.tokenSymbol }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step2.issuance }}</p>
      <p class="hint-step text-uppercase">{{ $t("step2.decimals") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step2.decimals }}</p>
      <custom-divider compClass="divider" />
      <p class="hint-step">{{ $t("step3.number_of_c") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step3.numberOfCustodians }}</p>
      <p class="hint-step">{{ $t("step3.number_of_v_per_t") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step3.numberOfVotes }}</p>
      <p class="hint-step">{{ $t("step3.length_of_c_term") }}</p>
      <p class="subtitle-step margin-bottom-15">{{ step3.periodLength }} {{ step3.periodLengthSelect }}</p>
      <custom-divider compClass="divider" />
      <p class="hint-step text-uppercase">{{ $t("step4.website_url") }}</p>
      <p class="subtitle-step margin-bottom-15 break-text">{{ step4.websiteUrl }}</p>
      <p class="hint-step text-uppercase">{{ $t("step4.logo_url") }}</p>
      <p class="subtitle-step margin-bottom-15 break-text">{{ step4.logoUrl }}</p>
      <p class="hint-step text-uppercase">{{ $t("step4.logomark_url") }}</p>
      <p class="subtitle-step margin-bottom-15 break-text">{{ step4.logoMarkUrl }}</p>
      <p class="hint-step text-uppercase">{{ $t("step4.colors_scheme") }}</p>
      <div class="subtitle-step margin-bottom-15 colors-scheme">
        <div v-for="color in step4.colorsScheme.scheme" :style="{ backgroundColor: `#${color}` }"></div>
      </div>
    </div>
    <div v-else class="break-text">
      <vue-json-pretty :data="customDacData"></vue-json-pretty>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";

import CustomDivider from "components/steps/Step3/CustomDivider";

export default {
  data() {
    const factoryData = this.$store.state.factory.stepsData;

    return {
      step1: factoryData[1],
      step2: factoryData[2],
      step3: factoryData[3],
      step4: factoryData[4],
      step5: factoryData[5],
      customDacData: this.$store.state.factory.customDacData
    };
  },
  components: {
    CustomDivider,
    VueJsonPretty
  }
};
</script>

<style scoped lang="stylus">
.divider
  margin 0 0 16px
.colors-scheme
  display grid
  grid-template-columns repeat(auto-fill, 20px)
  grid-auto-rows 20px
  grid-gap 8px
  & > div
    border 1px solid $light-violet
    border-radius 2px
</style>
