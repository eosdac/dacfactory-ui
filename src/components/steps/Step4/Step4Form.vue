<template>
    <div class="wrapper">
      <my-input
        :value="websiteURL"
        @input="websiteURL = $event.trim()"
        color="secondary"
        label="Website URL"
        :counter="false"
        hint="example: https://eosdac.io"
        :rules="[val => urlRegExp.test(val) || $t('step4.website_url_alt_hint')]"
        @statusChange="onStatusChange($event, 'websiteURL')"
        class="margin-add-bottom-8"
      />
      <my-input
        :value="logoURL"
        @input="logoURL = $event.trim()"
        color="secondary"
        label="Logo URL"
        :counter="false"
        hint="external link to a file"
        :rules="[val => urlSvgRegExp.test(val) || $t('step4.svg_url_alt_hint')]"
        @statusChange="onStatusChange($event, 'logoURL')"
        class="margin-add-bottom-8"
      />
      <my-input
        :value="logoMarkURL"
        @input="logoMarkURL = $event.trim()"
        color="secondary"
        label="Logomark URL"
        :counter="false"
        hint="external link to a file"
        :rules="[val => urlSvgRegExp.test(val) || $t('step4.svg_url_alt_hint')]"
        @statusChange="onStatusChange($event, 'logoMarkURL')"
      />
      <step4-color-picker />
    </div>
</template>

<script>
  import MyInput from 'components/form/my-input';
  import Step4ColorPicker from './Step4ColorPicker';

  import { URL_REG_EXP, URL_SVG_REG_EXP } from "components/constants/regExp";

  export default {
    data() {
      return {
        websiteURL: this.$store.state.factory.stepsData[4].websiteURL,
        logoURL: this.$store.state.factory.stepsData[4].logoURL,
        logoMarkURL: this.$store.state.factory.stepsData[4].logoMarkURL,
        urlRegExp: URL_REG_EXP,
        urlSvgRegExp: URL_SVG_REG_EXP
      }
    },
    components: {
      MyInput,
      Step4ColorPicker
    },
    methods: {
      onStatusChange(data, key) {
        this.$store.commit('factory/setStepsData', { step: 4, key, data });
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    margin-bottom: 24px;
  }
  .margin-add-bottom-8 {
    margin-bottom: 8px;
  }
</style>
