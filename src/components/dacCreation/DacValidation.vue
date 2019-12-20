<template>
  <section v-if="!isValidated">
    <article class="constitution">
      {{ CONSTITUTION_TEXT }}
    </article>
    <label class="checkbox-wrapper">
      <q-checkbox dark keep-color :value="isAgree" :color="checkboxError ? 'negative' : ''" @input="onInputCheckbox" />
      <span :class="checkboxError ? 'checkbox-error terms-conditions-anim' : 'checkbox-normal'">{{
        $t("dac_creation.i_have_read_and_agree")
      }}</span>
    </label>
    <q-btn
      color="secondary"
      class="validate-btn"
      :disable="isValidating"
      :label="isValidating ? 'Validating...' : $t('dac_creation.validate_dac')"
      @click="validateDac"
    />
    <!--TODO replace validation loading with animation-->
  </section>
  <section v-else>
    <p class="validated-text">{{ $t("dac_creation.dac_was_validated") }}</p>
    <q-btn to="/" color="secondary" :label="$t('dac_creation.go_to_main_page')" />
  </section>
</template>

<script>
import { CONSTITUTION_TEXT } from "components/constants";

export default {
  data() {
    return {
      isAgree: false,
      checkboxError: null,
      timeoutId: null,
      isValidated: false,
      validationError: null,
      isValidating: false,
      CONSTITUTION_TEXT
    };
  },
  props: {
    dacId: String,
    setDacValidated: Function
  },
  methods: {
    onInputCheckbox(isAgree) {
      this.isAgree = isAgree;
      this.checkboxError = false;
    },
    onCheckboxError() {
      this.checkboxError = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.checkboxError = false;
        this.timeoutId = null;
      }, 3000);
    },
    afterTransact(message) {
      if (!message) {
        this.isValidated = true;
        this.$store.commit("factory/resetFactoryState");
        this.setDacValidated();
      } else {
        this.validationError = message;
      }
      this.isValidating = false;
    },
    async validateDac() {
      if (!this.isAgree) {
        this.onCheckboxError();
        return;
      }

      const msgUint8 = new TextEncoder().encode(CONSTITUTION_TEXT);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      // TODO move to utils
      this.isValidating = true;
      this.$store.dispatch("ual/validateDacTransact", {
        dacId: this.dacId,
        hash,
        afterTransact: this.afterTransact
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.content-wrapper
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 0 16px
  text-align center
.checkbox-wrapper
  display flex
  align-items center
  width fit-content
  margin-top 14px
  & > span
    margin 0 0 0 5px
    transition color 0.2s
    &.checkbox-error
      color $negative
    &.checkbox-normal
      color $light-violet
.constitution
  max-width 400px
  text-align justify
.validate-btn
  margin-top 14px
.terms-conditions-anim
  animation shake 0.36s
.validated-text
  margin: 0 0 30px
  font-size 40px
  font-weight 700
  line-height normal
  color $positive
</style>
