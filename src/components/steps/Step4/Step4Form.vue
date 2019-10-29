<template>
  <div class="wrapper">
    <my-input
      color="secondary"
      label="Website URL"
      hint="example: https://eosdac.io"
      class="margin-add-bottom-8"
      :rules="[val => urlRegExp.test(val) || $t('step4.website_url_alt_hint')]"
      v-model="websiteURL"
      @statusChange="onStatusChange($event, 'websiteURL')"
    />
    <my-input
      color="secondary"
      label="Logo URL"
      hint="external link to a file"
      :rules="[val => urlRegExp.test(val) || $t('step4.svg_url_alt_hint')]"
      class="margin-add-bottom-8"
      v-model="logoURL"
      @statusChange="onStatusChange($event, 'logoURL')"
    />
    <my-input
      color="secondary"
      label="Logomark URL"
      hint="external link to a file"
      :rules="[val => urlRegExp.test(val) || $t('step4.svg_url_alt_hint')]"
      v-model="logoMarkURL"
      @statusChange="onStatusChange($event, 'logoMarkURL')"
    />
    <step4-color-picker />
  </div>
</template>

<script>
import MyInput from "components/form/my-input";
import Step4ColorPicker from "./Step4ColorPicker";

import { URL_REG_EXP } from "components/constants/regExp";

export default {
  data() {
    return {
      websiteURL: this.$store.state.factory.stepsData[4].websiteURL,
      logoURL: this.$store.state.factory.stepsData[4].logoURL,
      logoMarkURL: this.$store.state.factory.stepsData[4].logoMarkURL,
      urlRegExp: URL_REG_EXP
    };
  },
  components: {
    MyInput,
    Step4ColorPicker
  },
  methods: {
    onStatusChange(data, key) {
      this.$store.commit("factory/setStepsData", { step: 4, key, data });
    }
  }
};
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  margin-bottom: 24px;
}
.margin-add-bottom-8 {
  margin-bottom: 8px;
}
</style>
