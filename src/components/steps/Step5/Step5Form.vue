<template>
  <div>
    <p class="info-text max-width-260">{{ $t("step5.pay_month") }}</p>
    <div class="table-wrapper">
      <div class="table">
        <p class="info-text text1">{{ $t("step5.creation_of_account") }}</p>
        <p class="info-text max-width-300 text2">
          {{ $t("step5.once_you") }}
        </p>
      </div>
      <purchase-cards :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
      <div class="checkbox-wrapper">
        <q-checkbox dark keep-color :value="isAgree" :color="checkboxError ? 'red' : ''" @input="onInputCheckbox" />
        <p :class="checkboxError ? 'checkbox-error terms-conditions-anim' : 'checkbox-normal'">
          {{ $t("step5.i_agree_with") }}
          <router-link to="/terms" :class="checkboxError ? 'terms-link-error' : 'terms-link'">{{
            $t("step5.terms_and_conditions")
          }}</router-link>
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
      isAgree: this.$store.state.factory.stepsData[5].isAgree,
      checkboxError: false,
      timeoutId: null
    };
  },
  components: {
    PurchaseCards
  },
  mounted() {
    this.setIsAgree(false);
    this.isAgree = false;
  },
  methods: {
    onInputCheckbox(value) {
      this.isAgree = value;
      this.setIsAgree(this.isAgree);
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
    setIsAgree(isAgree) {
      this.$store.commit("factory/setStepsData", { step: 5, key: "isAgree", data: { value: isAgree } });
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
  width 924px
  height 490px
  margin 30px 0 0 40px
  padding-top 76px
  @media (max-width 1439px)
    width fit-content
    height auto
    margin 30px auto 0 auto
    padding-top 0
.table
  position relative
  z-index 1
  padding 38px 55px
  border 1px solid $secondary
  border-radius 4px
  color $light-violet
  @media (min-width 769px) and (max-width 909px)
    padding 38px 30px
  @media (max-width 479px)
    padding 18px 35px
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
.terms-link
  color $light-violet
  transition color 0.2s
  &:hover,
  &:focus
    color $medium-violet
.terms-link-error
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
