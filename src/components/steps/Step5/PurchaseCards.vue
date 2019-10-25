<template>
  <div class="wrapper">
    <purchase-card header="EOS" quantity="40" hint :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
    <purchase-card header="EOSDAC" quantity="10,000" :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
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

<style scoped lang="stylus">
.wrapper
  position absolute
  right 110px
  top 0
  display flex
  @media (max-width: 1059px)
    position static
    margin-top 30px
  @media (max-width: 479px)
    flex-direction column
    align-items center
</style>
