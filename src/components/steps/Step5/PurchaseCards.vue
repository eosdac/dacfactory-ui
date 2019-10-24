<template>
  <div class="wrapper">
    <purchase-card
      header="monthly"
      eosQuantity="10"
      eosDacQuantity="1000"
      timeInfo="Per month"
      hint="due on the 1st of each month"
      :isAgree="isAgree"
      :onCheckboxError="onCheckboxError"
    />
    <purchase-card
      header="yearly"
      eosQuantity="100"
      eosDacQuantity="10,000"
      timeInfo="One-time Purchase"
      :isAgree="isAgree"
      :onCheckboxError="onCheckboxError"
    />
  </div>
</template>

<script>
import PurchaseCard from "./PurchaseCard";

export default {
  props: {
    isAgree: Boolean,
    onCheckboxError: Function
  },
  components: {
    PurchaseCard
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  right: 110px;
  top: 0;
  display: flex;
}
@media (max-width: 1059px) {
  .wrapper {
    position: static;
    margin-top: 30px;
  }
}
@media (max-width: 479px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
  }
}
</style>
