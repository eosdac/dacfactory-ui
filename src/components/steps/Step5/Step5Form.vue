<template>
  <div>
    <p class="info-text max-width-260">Pay month to month or upfront for a year to get a discount.</p>
    <div class="table-wrapper">
      <div class="table">
        <p class="info-text text1">Creation of Accounts and hosting of DAC</p>
        <p class="info-text max-width-300 text2">
          Once you purchase, the DAC will be initially under the control of the account which set it up
        </p>
        <p class="italic-text max-width-300">
          If you miss a payment your DAC will bacon ipsum dolor amet leberkas doner kevin pork belly spare ribs biltong.
        </p>
      </div>
      <purchase-cards :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
      <div class="checkbox-wrapper">
        <q-checkbox dark keep-color :value="isAgree" :color="checkboxError ? 'red' : ''" @input="onInputCheckbox" />
        <p :class="checkboxError ? 'checkbox-error terms-conditions-anim' : 'checkbox-normal'">
          I agree with
          <router-link to="/terms" :class="checkboxError ? 'terms-conditions-link-error' : 'terms-conditions-link'"
            >terms</router-link
          >
          and
          <router-link to="/conditions" :class="checkboxError ? 'terms-conditions-link-error' : 'terms-conditions-link'"
            >conditions</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseCards from "components/steps/Step5/PurchaseCards";

export default {
  data() {
    return {
      isAgree: false,
      checkboxError: false,
      timeoutId: null
    };
  },
  components: {
    PurchaseCards
  },
  methods: {
    onInputCheckbox() {
      this.isAgree = !this.isAgree;
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
    }
  }
};
</script>

<style scoped lang="stylus">
p
  margin 0
.info-text
  font-size 16px
  letter-spacing 0.36px
  line-height 22px
  color $light-violet
.table-wrapper
  position relative
  width 1034px
  height 490px
  margin 30px 0 0 40px
  padding-top 76px
  @media (max-width 1439px)
    width auto
  @media (max-width 1059px)
    width fit-content
    height auto
    margin 0 auto
    padding-top 0
  @media (max-width 479px)
    margin-top 30px
.table
  position relative
  z-index 1
  padding 38px 55px
  border 1px solid #7c41ba
  border-radius 4px
  color $light-violet
.italic-text
  margin 0
  font-size 12px
  font-style italic
  line-height 17px
  color #ffffff
.checkbox-wrapper
  display flex
  align-items center
  margin 32px 0 0 45px
  & > p
    margin-left 5px
    transition color 0.2s
    &.checkbox-error
      color red
    &.checkbox-normal
      color $light-violet
.terms-conditions-link
  color $light-violet
  transition color 0.2s
  &:hover,
  &:focus
    color $medium-violet
.terms-conditions-link-error
  color red
  transition color 0.2s
  &:hover,
  &:focus
    color $negative
.terms-conditions-anim
  animation shake 0.36s
.text1
  margin 30px 0 0
.text2
  margin 35px 0 45px
.max-width-260
  max-width 260px
.max-width-300
  max-width 300px
@keyframes shake
  10%, 50%, 80%
    margin-left 2px
  30%, 70%, 100%
    margin-left -2px
</style>
