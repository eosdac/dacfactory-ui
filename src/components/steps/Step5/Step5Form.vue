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
      checkboxError: "",
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
      }, 3000);
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.info-text {
  font-size: 16px;
  letter-spacing: 0.36px;
  line-height: 22px;
  color: #ebdff9;
}
.table-wrapper {
  position: relative;
  width: 1034px;
  height: 490px;
  margin: 30px 0 0 40px;
  padding-top: 76px;
}
.table {
  position: relative;
  z-index: 1;
  padding: 38px 55px;
  border: 1px solid #7c41ba;
  border-radius: 4px;
  color: #ebdff9;
}
.italic-text {
  margin: 0;
  font-size: 12px;
  font-style: italic;
  line-height: 17px;
  color: #ffffff;
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
  margin: 32px 0 0 45px;
}
.checkbox-wrapper p {
  margin-left: 5px;
  transition: color 0.2s;
}
.terms-conditions-link {
  color: #ebdff9;
  transition: color 0.2s;
}
.terms-conditions-link:hover,
.terms-conditions-link:focus {
  color: #b999db;
}
.checkbox-error {
  color: red;
}
.checkbox-normal {
  color: #ebdff9;
}
.terms-conditions-link-error {
  color: red;
  transition: color 0.2s;
}
.terms-conditions-link-error:hover,
.terms-conditions-link-error:focus {
  color: var(--q-color-negative);
}
.terms-conditions-anim {
  animation: q-field-label 0.36s;
}
.text1 {
  margin: 30px 0 0;
}
.text2 {
  margin: 35px 0 45px;
}
.max-width-260 {
  max-width: 260px;
}
.max-width-300 {
  max-width: 300px;
}
@media (max-width: 1439px) {
  .table-wrapper {
    width: auto;
  }
}
@media (max-width: 1059px) {
  .table-wrapper {
    width: fit-content;
    height: auto;
    margin: 0 auto;
    padding-top: 0;
  }
}
@media (max-width: 479px) {
  .table-wrapper {
    margin-top: 30px;
  }
}

@keyframes q-field-label {
  20%,
  60%,
  90% {
    margin-left: 2px;
  }
  40%,
  80% {
    margin-left: -2px;
  }
}
</style>
