<template>
  <div>
    <p class="hint-step ">{{ $t("step3.hint1") }}</p>
    <h2 class="title-step">{{ $t("step3.title_right") }}</h2>
    <p class="subtitle-step margin-bottom-30">{{ $t("step3.subtitle1") }}</p>
    <p class="hint-step ">{{ $t("step3.hint2") }}</p>
    <p class="subtitle-step margin-bottom-20">{{ $t("step3.subtitle2") }}</p>
    <p class="hint-step ">{{ $t("step3.hint3") }}</p>
    <p class="subtitle-step margin-bottom-30">{{ $t("step3.subtitle3") }}</p>
    <custom-divider />
    <p class="hint-step ">{{ $t("step3.hint4") }}</p>
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
