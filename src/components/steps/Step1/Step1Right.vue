<template>
  <div>
    <p class="hint-step">{{ $t("general.why_and_how") }}</p>
    <h2 class="title-step">{{ $t("step1.title_right") }}</h2>
    <p class="subtitle-step margin-bottom-30">{{ $t("step1.info_line1") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step1.dac_name") }}</p>
    <p class="subtitle-step margin-bottom-20">{{ $t("step1.info_line2") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step1.token_symbol") }}</p>
    <p class="subtitle-step margin-bottom-20">{{ $t("step1.info_line3") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step1.description") }}</p>
    <p class="subtitle-step margin-bottom-20">{{ $t("step1.info_line4") }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
