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
      <purchase-cards />
      <div class="terms-conditions"><input type="checkbox"><p>I agree with terms and conditions</p></div>
    </div>
  </div>
</template>

<script>
import PurchaseCards from "components/steps/Step5/PurchaseCards";

export default {
  components: {
    PurchaseCards
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
  padding: 0 55px;
  height: 310px;
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
.terms-conditions {
  display: flex;
  margin: 40px 0 0 56px;
  font-size: 16px;
  line-height: 22px;
  color: #ebdff9;
}
.text1 {
  margin: 68px 0 0;
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
</style>
