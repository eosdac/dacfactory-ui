<template>
  <div class="wrapper" v-if="paymentPlans">
    <purchase-card
      hint
      :header="notDacToken"
      :quantity="paymentPlans"
      :isAgree="isAgree"
      :onCheckboxError="onCheckboxError"
    />
    <purchase-card :header="dacToken" :quantity="paymentPlans" :isAgree="isAgree" :onCheckboxError="onCheckboxError" />
  </div>
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
      notDacToken: process.env.NOT_DAC_TOKEN,
      paymentPlans: null,
      paymentPlansError: null
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
        const amount = String(plan.amount.quantity.split(" ")[0] * 2).split("");
        let counter = 0;
        for (let i = amount.length - 1; i >= 0; i--) {
          counter++;
          if (amount[i] === ".") {
            counter = 0;
            continue;
          }
          if (counter === 3) {
            counter = 0;
            amount.splice(i, 0, ",");
          }
        }
        paymentPlans[plan.plan_id === "monthly" ? this.dacToken : this.notDacToken] = {
          quantityToShow: amount.join(""),
          quantityToPay: plan.amount.quantity
        };
      });
      this.paymentPlans = paymentPlans;
    } catch (error) {
      this.paymentPlansError = error.message;
    }
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
