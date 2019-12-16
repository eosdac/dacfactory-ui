<template>
  <div>
    <my-input
      color="secondary"
      :label="$t('step4.website_url')"
      :hint="`${$t('general.example')}: https://dacfactory.io`"
      class="margin-add-bottom-8"
      :isSetFocus="focused === 'websiteURL'"
      v-model="websiteURL"
      @statusChange="onStatusChange($event, 'websiteURL')"
    />
    <my-input
      color="secondary"
      :label="$t('step4.logo_url')"
      :hint="$t('step4.link_hint')"
      class="margin-add-bottom-8"
      :isSetFocus="focused === 'logoURL'"
      v-model="logoURL"
      @statusChange="onStatusChange($event, 'logoURL')"
    />
    <my-input
      color="secondary"
      :label="$t('step4.logomark_url')"
      :hint="$t('step4.link_hint')"
      :isSetFocus="focused === 'logoMarkURL'"
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
    const { websiteURL, logoURL, logoMarkURL } = this.$store.state.factory.stepsData[4];

    return {
      websiteURL,
      logoURL,
      logoMarkURL,
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
