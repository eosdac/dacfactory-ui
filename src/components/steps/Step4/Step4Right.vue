<template>
  <div>
    <p class="hint-step">{{ $t("general.why_and_how") }}</p>
    <h2 class="title-step">{{ $t("step4.title_right") }}</h2>
    <p class="subtitle-step margin-bottom-30">{{ $t("step4.subtitle1") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step4.logo_url") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ $t("step4.subtitle2") }}</p>
    <img src="../../../statics/images/eosdac-logo.svg" alt="eosDAC logo" class="logo" />
    <p class="hint-step text-uppercase">{{ $t("step4.logomark_url") }}</p>
    <p class="subtitle-step margin-bottom-15">{{ $t("step4.subtitle3") }}</p>
    <img src="../../../statics/images/eosdac-logo-notext.svg" alt="eosDAC logo without text" class="margin-bottom-15" />
    <p class="small-title">{{ $t("step4.subtitle4") }}</p>
    <p class="hint-step text-uppercase">{{ $t("step4.colors_scheme") }}</p>
    <p class="subtitle-step">{{ $t("step4.subtitle5") }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.small-title {
  margin-bottom: 35px;
  font-size: 14px;
  letter-spacing: 0.31px;
  line-height: 22px;
  color: #ebdff9;
}
.logo {
  margin-bottom: 22px;
}
.margin-bottom-15 {
  margin-bottom: 15px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
