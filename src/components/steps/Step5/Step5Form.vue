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
      <purchase-cards :isAgree="isAgree" :onCheckboxError="onCheckboxError" :checkboxRef="checkboxRef" />
      <div class="checkbox-wrapper" ref="checkbox_ref">
        <q-checkbox
          dark
          keep-color
          :value="isAgree"
          :color="checkboxError ? 'negative' : ''"
          @input="onInputCheckbox"
        />
        <span :class="checkboxError ? 'checkbox-error terms-conditions-anim' : ''">
          {{ $t("step5.i_agree_with") }}
          <q-btn flat @click="showTerms = true" :class="checkboxError ? 'terms-link-error' : 'terms-link'">{{
            $t("step5.terms_and_conditions")
          }}</q-btn>
        </span>
      </div>
    </div>
    <q-dialog v-model="showTerms">
      <div class="bg-black text-white q-pa-md">
        <q-markdown :src="terms" :no-container="true"></q-markdown>
      </div>
    </q-dialog>
  </div>

</template>

<script>
import PurchaseCards from "components/steps/Step5/PurchaseCards";
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';

export default {
  data() {
    return {
      isAgree: this.$store.state.factory.stepsData[5].isAgree,
      checkboxError: false,
      timeoutId: null,
      checkboxRef: null,
      terms: null,
      showTerms: false
    };
  },
  components: {
    PurchaseCards,
    QMarkdown
  },
  async mounted() {
    this.setIsAgree(false);
    this.isAgree = false;

    this.checkboxRef = this.$refs.checkbox_ref;

    const res = await this.$axios.get('https://raw.githubusercontent.com/eosdac/dacfactory-docs/master/EULA.md');
    // console.log(res.data);
    this.terms = res.data;
  },
  methods: {
    onInputCheckbox(isAgree) {
      this.isAgree = isAgree;
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
  width 914px
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
  @media (max-width 1439px)
    padding 8px 45px
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
  & > span
    margin-left 5px
    transition color 0.2s
    &.checkbox-error
      color $negative
    &.checkbox-normal
      color $light-violet
.terms-link
  color $light-violet
  transition color 0.2s
  &:hover,
  &:focus
    color $medium-violet
.terms-link-error
  color $negative
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
.terms-wrapper
  margin: 0px 40px
</style>
