<template>
  <div>
    <h2 class="title-step">{{ $t("step5.title_right") }}</h2>
    <p class="hint-step text-uppercase break-text-hyphens">{{ $t("step1.dac_name") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step1.dacName }}</p>
    <p class="hint-step text-uppercase">{{ $t("step1.token_symbol") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step1.tokenSymbol }}</p>
    <p class="hint-step text-uppercase">{{ $t("step1.description") }}</p>
    <p class="subtitle-step margin-bottom-15 break-text-hyphens">{{ step1.dacDescription }}</p>
    <custom-divider class="divider" />
    <p class="hint-step text-uppercase">{{ $t("step2.issuance", { token_symbol: step1.tokenSymbol }) }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step2.issuance }}</p>
    <p class="hint-step text-uppercase">{{ $t("step2.decimals") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step2.decimals }}</p>
    <custom-divider class="divider" />
    <p class="hint-step">{{ $t("step3.hint2") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step3.numberOfCustodians }}</p>
    <p class="hint-step">{{ $t("step3.hint3") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step3.numberOfVotes }}</p>
    <p class="hint-step">{{ $t("step3.hint4") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step3.periodLength }} {{step3.periodLengthSelect}}</p>
    <custom-divider class="divider" />
    <p class="hint-step text-uppercase">{{ $t("step4.website_url") }}</p>
    <p class="subtitle-step margin-bottom-15 break-text">{{ step4.websiteURL }}</p>
    <p class="hint-step text-uppercase">{{ $t("step4.logo_url") }}</p>
    <p class="subtitle-step margin-bottom-15 break-text">{{ step4.logoURL }}</p>
    <p class="hint-step text-uppercase">{{ $t("step4.logomark_url") }}</p>
    <p class="subtitle-step margin-bottom-15 break-text">{{ step4.logoMarkURL }}</p>
    <p class="hint-step text-uppercase">{{ $t("step4.colors_scheme") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ step4.colorsScheme }}</p>
  </div>
</template>

<script>
import CustomDivider from "components/steps/Step3/CustomDivider";

export default {
  data() {
    const factoryData = this.$store.state.factory.stepsData;

    return {
      step1: factoryData[1],
      step2: factoryData[2],
      step3: factoryData[3],
      step4: factoryData[4],
      step5: factoryData[5]
    };
  },
  components: {
    CustomDivider
  }
};
</script>

<style scoped lang="stylus">
.divider
  margin 0 0 16px
</style>
