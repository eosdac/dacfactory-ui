<template>
  <div>
    <my-input
      color="secondary"
      class="margin-add-bottom-8"
      :label="$t('step4.website_url')"
      :hint="`${$t('general.example')}: ${CREATION_WEBSITE_URL}`"
      :isSetFocus="focused === WEBSITE_URL_FIELD"
      :isShowAppend="!!websiteUrl"
      :rules="[val => isValidUrl(val)]"
      v-model="websiteUrl"
      @statusChange="onStatusChange($event, WEBSITE_URL_FIELD)"
    />
    <my-input
      color="secondary"
      class="margin-add-bottom-8"
      :label="$t('step4.logo_url')"
      :hint="$t('step4.link_hint')"
      :isSetFocus="focused === LOGO_URL_FIELD"
      :isShowAppend="!!logoUrl"
      :rules="[val => isValidUrl(val)]"
      v-model="logoUrl"
      @statusChange="onStatusChange($event, LOGO_URL_FIELD)"
    />
    <my-input
      color="secondary"
      :label="$t('step4.logomark_url')"
      :hint="$t('step4.link_hint')"
      :isSetFocus="focused === LOGO_MARK_URL_FIELD"
      :isShowAppend="!!logoMarkUrl"
      :rules="[val => isValidUrl(val)]"
      v-model="logoMarkUrl"
      @statusChange="onStatusChange($event, LOGO_MARK_URL_FIELD)"
    />
    <step4-color-picker />
  </div>
</template>

<script>
import MyInput from "components/form/my-input";
import Step4ColorPicker from "./Step4ColorPicker";

import { isValidUrl } from "imports/validators";
import { findStepErrors } from "imports/utils";

const WEBSITE_URL_FIELD = "websiteUrl";
const LOGO_URL_FIELD = "logoUrl";
const LOGO_MARK_URL_FIELD = "logoMarkUrl";

export default {
  data() {
    const { websiteUrl, logoUrl, logoMarkUrl } = this.$store.state.factory.stepsData[4];

    return {
      websiteUrl,
      logoUrl,
      logoMarkUrl,
      WEBSITE_URL_FIELD,
      LOGO_URL_FIELD,
      LOGO_MARK_URL_FIELD,
      CREATION_WEBSITE_URL: process.env.CREATION_WEBSITE_URL,
      isValidUrl,
      focused: null
    };
  },
  mounted() {
    this.focused = findStepErrors(this.$store.state.factory.stepsData[4], true);
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
