<template>
  <section :class="['card', transparent ? 'first-card' : 'second-card']">
    <h3 class="card-header">{{ $t("step5.pay_in") }} {{ header }}</h3>
    <div class="card-body">
      <p class="quantity margin-top--5">
        {{ quantity[header].quantityToShow }}<span>{{ header }}</span>
      </p>
      <span class="time-info">(plan fee)</span>
      <p class="quantity margin-top-5">{{ quantity.setupFee.split(".")[0] }}<span>{{NATIVE_TOKEN}}</span></p>
      <span class="time-info">(setup fee)</span>
      <p class="time-info margin-top-15 ">{{ $t("step5.30_days") }}</p>
      <p class="hint margin-top-15">{{ $t("step5.due_on") }}<span class="question">?</span></p>
    </div>
    <div class="card-footer" v-if="payButton">
      <q-btn
        :label="$t(`step5.${loggedInUser ? 'pay' : 'login_to_pay'}`)"
        color="secondary"
        class="q-mt-md"
        @click="loggedInUser ? transfer(header === DAC_TOKEN) : $store.dispatch('ual/renderLoginModal')"
      />
    </div>
    <div class="card-footer" v-else>
      <q-btn
        to="/create/step1"
        :label="$t(`pricing.start`)"
        color="secondary"
        class="q-mt-md"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

const FOOTER_HEIGHT = 57;
const CHECKBOX_MARGIN_TOP = 32;

export default {
  data() {
    return {
      DAC_TOKEN: process.env.DAC_TOKEN,
      NATIVE_TOKEN: process.env.NATIVE_TOKEN,
      loggedInUser: this.$store.state.ual.accountName
    };
  },
  props: {
    header: {
      type: String,
      require: true
    },
    quantity: {
      type: Object,
      require: true
    },
    transparent: {
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
    },
    payButton: {
      type: Boolean,
      default: true
    },
    checkboxRef: Element
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    transfer(isDacToken) {
      if (!this.isAgree) {
        this.scrollPageToBottomIfNeeded();
        this.onCheckboxError();
        return;
      }

      this.$store.commit("ual/setPaymentInfo", { isDacToken, tokenQuantity: this.quantity });
      this.$router.push("/dac-creation");
    },
    scrollPageToBottomIfNeeded() {
      if (window.innerWidth > 1439) {
        return;
      }

      const docElemHeight = document.documentElement.clientHeight;
      const checkboxOffsetTop =
        this.checkboxRef.getBoundingClientRect().bottom +
        (this.$store.state.factory.customDacData ? 0 : FOOTER_HEIGHT) +
        CHECKBOX_MARGIN_TOP;
      if (docElemHeight < checkboxOffsetTop) {
        window.scrollBy({
          top: checkboxOffsetTop - docElemHeight
        });
      }
    }
  },
  watch: {
    "$store.state.ual.accountName"(value) {
      this.loggedInUser = value;
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
  width 190px
  height 100%
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
.card-body
  display flex
  flex-direction column
  justify-content center
  align-items center
  height: 276px
  & > div.quantity:last-child
    margin-top 5px
.quantity
  display flex
  flex-direction column
  align-items center
  font-size 46px
  line-height normal
  & > span
    font-size 16px
.time-info
  font-size 13px
  font-weight 500
  letter-spacing 0.29px
  line-height 15px
.hint
  position relative
  max-width 100px
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
  & > button
    margin 0
.margin-top-15
  margin-top 15px
.margin-top-5
  margin-top 5px
.margin-top--5
  margin-top -5px
@media (max-width 479px)
  .first-card
    margin 0
  .second-card
    margin-top 30px
</style>
