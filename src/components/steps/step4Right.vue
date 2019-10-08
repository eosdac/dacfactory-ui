<template>
  <div>
    <p class="hint">{{ $t("step4.hint1") }}</p>
    <h2 class="title">{{ $t("step4.title_right") }}</h2>
    <p class="subtitle margin-bottom-30">{{ $t("step4.subtitle1") }}</p>
    <p class="hint">{{ $t("step4.hint2") }}</p>
    <p class="subtitle margin-bottom-15">{{ $t("step4.subtitle2") }}</p>
    <p>LOGO IS HERE</p>
    <p class="hint">{{ $t("step4.hint3") }}</p>
    <p class="subtitle margin-bottom-15">{{ $t("step4.subtitle3") }}</p>
    <p>SHORT LOGO IS HERE</p>
    <p class="small-title">{{ $t("step4.subtitle4") }}</p>
    <p class="hint">{{ $t("step4.hint4") }}</p>
    <p class="subtitle">{{ $t("step4.subtitle5") }}</p>
  </div>
</template>

<script>
export default {};
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
  margin-bottom: 20px;
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
.small-title {
  margin-bottom: 35px;
  font-size: 14px;
  letter-spacing: 0.31px;
  line-height: 22px;
  color: #ebdff9;
}
.margin-bottom-15 {
  margin-bottom: 15px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
