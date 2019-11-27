<template>
  <section class="wrapper centered-wrapper" v-if="isPaymentLoading">
    <q-icon name="loop" color="secondary" class="loader" />
  </section>
  <section class="wrapper" v-else-if="paymentPlans">
    <purchase-card
      transparent
      :header="nativeToken"
      :quantity="paymentPlans"
      :isAgree="isAgree"
      :onCheckboxError="onCheckboxError"
    />
    <purchase-card :header="dacToken" :quantity="paymentPlans" :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
  </section>
  <section class="wrapper centered-wrapper" v-else-if="paymentPlansError">
    {{ paymentPlansError }}
  </section>
</template>

<script>
import PurchaseCard from "./PurchaseCard";

export default {
  props: {
    isAgree: Boolean,
    onCheckboxError: Function
  },
  data() {
    return {
      dacToken: process.env.DAC_TOKEN,
      nativeToken: process.env.NATIVE_TOKEN,
      paymentPlans: null,
      paymentPlansError: null,
      isPaymentLoading: true
    };
  },
  async mounted() {
    try {
      const res = await this.$eosapi.get_table_rows({
        code: "dacfactoryio",
        index_position: 1,
        json: true,
        key_type: "i64",
        limit: "100",
        lower_bound: null,
        reverse: false,
        scope: "dacfactoryio",
        show_payer: false,
        table: "plans",
        table_key: "",
        upper_bound: null
      });

      const paymentPlans = {};
      res.rows.forEach(plan => {
        const amount = plan.amount.quantity.split(".")[0].split("");
        let counter = 0;
        for (let i = amount.length - 1; i >= 0; i--) {
          counter++;
          if (amount[i] === ".") { // just for completed function, here isn't needed
            counter = 0;
            continue;
          }
          if (counter === 3) {
            counter = 0;
            amount.splice(i, 0, ",");
          }
        }

        paymentPlans[plan.plan_id === "monthly" ? this.dacToken : this.nativeToken] = {
          quantityToShow: amount.join(""),
          toPay: {
            planId: plan.plan_id,
            quantityPlan: plan.amount.quantity,
          }
        };
      });
      this.paymentPlans = paymentPlans;
    } catch (error) {
      this.paymentPlansError = error.message;
    }
    this.isPaymentLoading = false;
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
  @media (max-width 1059px)
    position static
    margin-top 30px
  @media (max-width 479px)
    flex-direction column
    align-items center
.centered-wrapper
  justify-content center
  align-items center
  width 430px
  height 456px
  font-size 40px
  @media (max-width 479px)
    width: auto
    font-size 16px
.loader
  font-size 80px
  animation rotate 1.5s infinite linear
  @media (max-width 479px)
    font-size 50px
@keyframes rotate
  from
      transform scale(-1, 1) rotate(360deg)
  to
      transform scale(-1, 1) rotate(0)
</style>
