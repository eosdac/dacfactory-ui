<template>
  <section v-if="!isValidated && !validationError">
    <article class="constitution break-text-hyphens">
      {{ CONSTITUTION_TEXT }}
    </article>
    <label class="checkbox-wrapper">
      <q-checkbox dark keep-color :value="isAgree" :color="checkboxError ? 'negative' : ''" @input="onInputCheckbox" />
      <span :class="checkboxError ? 'checkbox-error terms-conditions-anim' : 'checkbox-normal'">{{
        $t("dac_creation.i_have_read_and_agree")
      }}</span>
    </label>
    <q-btn color="secondary" class="validate-btn" :label="$t('dac_creation.validate_dac')" @click="validateDac" />
  </section>
  <section v-else-if="!validationError">
    <p class="validated-text">{{ $t("dac_creation.dac_was_validated") }}</p>
    <a :href="`http://${dacId}.dev.dacfactory.io`" class="dac-link">{{ $t("dac_creation.go_to_your_dac") }}</a>
  </section>
  <section v-else>
    <p class="validated-text validation-fail">{{ $t("dac_creation.dac_was_not_validated") }}</p>
    <div class="error-buttons-wrapper">
      <q-btn to="/" color="secondary" :label="$t('dac_creation.go_to_main_page')" />
      <q-btn color="secondary" :label="$t('dac_creation.try_again')" @click="tryAgain" />
    </div>
  </section>
</template>

<script>
import { encodeInSHA1 } from "imports/utils";

import { CONSTITUTION_TEXT } from "components/constants";

export default {
  data() {
    return {
      isAgree: false,
      checkboxError: null,
      timeoutId: null,
      isValidated: false,
      validationError: null,
      CONSTITUTION_TEXT,
      dacId: this.$store.getters["factory/getDacId"]
    };
  },
  props: {
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
      } else {
        this.validationError = message;
      }
      this.setDacValidated(true);
    },
    async validateDac() {
      if (!this.isAgree) {
        this.onCheckboxError();
        return;
      }

      this.$store.commit("ual/setSigningOverlay", {
        show: true,
        status: 0,
        msg: this.$t("dac_creation.constitution_preparation"),
        isShowCloseButton: false
      });
      try {
        const hash = await encodeInSHA1();
        await this.$store.dispatch("ual/validateDacTransact", {
          dacId: this.dacId,
          hash,
          afterTransact: this.afterTransact
        });
      } catch (error) {
        this.$store.commit("ual/setSigningOverlay", { show: false, status: 0 });
        this.afterTransact(error);
      }
    },
    tryAgain() {
      this.validationError = null;
      this.setDacValidated(false);
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
  max-height 400px
  overflow-y auto
  text-align left
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
.validation-fail
  color $negative
.error-buttons-wrapper
  display grid
  grid-template-columns auto auto
  grid-gap 30px
  width fit-content
  margin 0 auto
.dac-link
  display flex
  justify-content center
  align-items center
  cursor pointer
  font-size 14px
  font-weight 500
  border-radius 3px
  text-decoration none
  text-transform uppercase
  color #ffffff
  min-height 2.572em
  width fit-content
  padding 4px 16px
  margin 0 auto
  line-height normal
  background-color $secondary
  transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)

  &:hover, &:focus
    background-color #8d61c0 // TODO replace with real component similar to quasar button
</style>
