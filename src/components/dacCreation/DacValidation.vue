<template>
  <section>
  <article class="constitution">
    constitution text is here constitution text is here constitution text is here constitution text is here
    constitution text is here constitution text is here constitution text is here constitution text is here
    constitution text is here constitution text is here constitution text is here constitution text is here
    constitution text is here constitution text is here constitution text is here constitution text is here
    constitution text is here
  </article>
  <label class="checkbox-wrapper">
    <q-checkbox
      dark
      keep-color
      :value="isAgree"
      :color="checkboxError ? 'negative' : ''"
      @input="onInputCheckbox"
    />
    <span :class="checkboxError ? 'checkbox-error terms-conditions-anim' : 'checkbox-normal'">{{ $t("dac_validation.i_have_read_and_agree") }}</span>
  </label>
  <q-btn
    :label="$t('dac_creation.validate_dac')"
    color="secondary"
    class="validate-btn"
    @click="validateDac"
  />
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isAgree: false,
        checkboxError: null,
        timeoutId: null,
        isValidate: false,
        validationError: null
      };
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
      validateDac() {
        if (!this.isAgree) {
          this.onCheckboxError();
          return;
        }
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
</style>
