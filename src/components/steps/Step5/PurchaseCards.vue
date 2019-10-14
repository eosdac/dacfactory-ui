<template>
  <div class="wrapper">
    <purchase-card
      header="MONTHLY"
      eosQuantity="10"
      eosDacQuantity="1000"
      timeInfo="Per month"
      hint="due on the 1st of each month"
    />
    <purchase-card
      header="YEAR"
      eosQuantity="100"
      eosDacQuantity="10,000"
      timeInfo="One-time Purchase"
    />
  </div>
</template>

<script>
import PurchaseCard from "./PurchaseCard";

export default {
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
</style>
