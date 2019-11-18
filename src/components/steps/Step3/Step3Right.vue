<template>
  <div>
    <p class="hint">{{ $t("step3.hint1") }}</p>
    <h2 class="title">{{ $t("step3.title_right") }}</h2>
    <p class="subtitle margin-bottom-30">{{ $t("step3.subtitle1") }}</p>
    <p class="hint">{{ $t("step3.hint5") }}</p>
    <p class="subtitle margin-bottom-30">{{ $t("step3.subtitle_dolor_amet") }}</p>
    <custom-divider />
    <p class="hint">{{ $t("step3.hint6") }}</p>
    <p class="subtitle margin-bottom-20">{{ $t("step3.subtitle_dolor_amet") }}</p>
    <p class="hint">{{ $t("step3.hint10") }}</p>
    <p class="subtitle margin-bottom-30">{{ $t("step3.subtitle_dolor_amet") }}</p>
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
.hint {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 21px;
  color: #b999db;
}
.title {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 700;
  line-height: 32px;
}
.subtitle {
  font-size: 16px;
  letter-spacing: 0.36px;
  line-height: 22px;
  color: #ebdff9;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
