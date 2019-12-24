<template>
  <div>
    <p class="hint-step">{{ $t("general.why_and_how") }}</p>
    <h2 class="title-step">{{ $t("step3.title_right") }}</h2>
    <p class="subtitle-step margin-bottom-30">{{ $t("step3.subtitle1") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step3.number_of_c") }}</p>
    <p class="subtitle-step margin-bottom-20">{{ $t("step3.subtitle2") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step3.number_of_v_per_t") }}</p>
    <p class="subtitle-step margin-bottom-30">{{ $t("step3.subtitle3") }}</p>
    <custom-divider />
    <p class="hint-step text-uppercase">{{ $t("step3.length_of_c_term") }}</p>
    <p class="subtitle-step margin-bottom-30">{{ $t("step3.subtitle4") }}</p>
    <!--change with real text-->
  </div>
</template>

<script>
import CustomDivider from "./CustomDivider";

export default {
  components: {
    CustomDivider
  }
};
</script>

<style scoped>
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
