<template>
  <div>
    <my-input
      color="secondary"
      label="Website URL"
      hint="example: https://eosdac.io"
      class="margin-add-bottom-8"
      :isSetFocus="focused === 'websiteURL'"
      :rules="[val => urlRegExp.test(val) || $t('step4.website_url_alt_hint')]"
      v-model="websiteURL"
      @statusChange="onStatusChange($event, 'websiteURL')"
    />
    <my-input
      color="secondary"
      label="Logo URL"
      hint="external link to a file"
      class="margin-add-bottom-8"
      :isSetFocus="focused === 'logoURL'"
      :rules="[val => urlRegExp.test(val) || $t('step4.website_url_alt_hint')]"
      v-model="logoURL"
      @statusChange="onStatusChange($event, 'logoURL')"
    />
    <my-input
      color="secondary"
      label="Logomark URL"
      hint="external link to a file"
      :isSetFocus="focused === 'logoMarkURL'"
      :rules="[val => urlRegExp.test(val) || $t('step4.website_url_alt_hint')]"
      v-model="logoMarkURL"
      @statusChange="onStatusChange($event, 'logoMarkURL')"
    />
    <step4-color-picker />
  </div>
</template>

<script>
  import { findStepErrors } from "imports/utils";

import MyInput from "components/form/my-input";
import Step4ColorPicker from "./Step4ColorPicker";

import { URL_REG_EXP } from "components/constants";

export default {
  data() {
    return {
      websiteURL: this.$store.state.factory.stepsData[4].websiteURL,
      logoURL: this.$store.state.factory.stepsData[4].logoURL,
      logoMarkURL: this.$store.state.factory.stepsData[4].logoMarkURL,
      urlRegExp: URL_REG_EXP,
      focused: null
    };
  },
  mounted() {
    this.focused = findStepErrors(this.$store.state.factory.stepsData[4]);
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
.margin-add-bottom-8 {
  margin-bottom: 8px;
}
</style>
