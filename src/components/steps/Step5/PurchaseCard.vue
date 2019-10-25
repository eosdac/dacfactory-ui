<template>
  <section :class="['card', hint ? 'first-card' : 'second-card']">
    <h3 class="card-header">{{ $t("step5.pay_in") }} {{ header }}</h3>
    <p class="eos-quantity">
      {{ quantity }}<span>{{ header }}</span>
    </p>
    <p class="time-info">{{ $t("step5.30_days") }}</p>
    <p class="hint">{{ $t("step5.due_on") }}<span class="question">?</span></p>
    <div class="card-footer">
      <q-btn
        :label="$t('step5.pay')"
        color="secondary"
        class="q-mt-md"
        @click="transfer(header === 'EOS' ? EOS_TOKEN : DAC_TOKEN)"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      EOS_TOKEN: "EOS",
      DAC_TOKEN: "DAC"
    };
  },
  props: {
    header: {
      type: String,
      require: true
    },
    quantity: {
      type: String,
      require: true
    },
    hint: {
      type: Boolean,
      require: false
    },
    isAgree: {
      type: Boolean,
      required: true
    },
    onCheckboxError: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    transfer(payTokenSymbol) {
      if (!this.isAgree) {
        this.onCheckboxError();
        return;
      }

      const {
        factory: { stepsData },
        ual: { activeAuthenticator, accountName }
      } = this.$store.state;
      if (!activeAuthenticator || !accountName) {
        this.$store.dispatch("ual/renderLoginModal");
        return;
      }

      const payTokenQuantity =
        payTokenSymbol === this.EOS_TOKEN
          ? `${parseInt(this.quantity).toFixed(4)} ${this.EOS_TOKEN}`
          : `${parseInt(this.quantity.replace(",", "")).toFixed(4)} ${process.env.DAC_TOKEN}`;

      this.$store.dispatch("ual/prepareDacTransact", { stepsData, payTokenSymbol, payTokenQuantity });
    }
  }
};
</script>

<style scoped lang="stylus">
p
  margin 0
.card
  display flex
  flex-direction column
  align-items center
  height 456px
  width 190px
  border-radius 4px
  font-weight 700
  color #ebdff9
.first-card
  margin-right 50px
.second-card
  background-color $dark-violet
.card-header
  display flex
  justify-content center
  align-items center
  height 76px
  margin 0
  font-size 16px
  font-weight 700
  letter-spacing 0.36px
  line-height 19px
  text-transform uppercase
.eos-quantity
  display flex
  flex-direction column
  align-items center
  margin-top 24px
  font-size 46px
  line-height normal
  & > span
    font-size 16px
.time-info
  margin-top 20px
  font-size 13px
  font-weight 500
  letter-spacing 0.29px
  line-height 15px
  color #ffffff
.hint
  position relative
  max-width 100px
  margin-top 15px
  color #ffffff
  font-size 12px
  font-style italic
  line-height 14px
  text-align center
.question
  position absolute
  right -22px
  top 50%
  display flex
  justify-content center
  align-items center
  width 18px
  height 18px
  border-radius 50%
  background-color $medium-violet
  font-size 12px
  font-weight 900
  font-style normal
  letter-spacing 0.29px
  line-height 14px
  color #ffffff
  transform translateY(-50%)
.card-footer
  display flex
  align-items center
  height 104px
  margin-top auto
  & > button
    margin 0
@media (max-width: 479px)
  .first-card
    margin 0
  .second-card
    margin-top 30px
</style>
