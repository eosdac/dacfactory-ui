<template>
  <section :class="['card', hint ? 'first-card' : 'second-card']">
    <h3 class="card-header">{{ $t("step5.pay_in") }} {{ header }}</h3>
    <div class="card-body">
      <p class="quantity">
        {{ quantity[header].quantityToShow }}<span>{{ header }}</span>
      </p>
      <p class="time-info">{{ $t("step5.30_days") }}</p>
      <p class="hint">{{ $t("step5.due_on") }}<span class="question">?</span></p>
    </div>
    <div class="card-footer">
      <q-btn
        :label="$t(`step5.${loggedInUser ? 'pay' : 'login_to_pay'}`)"
        color="secondary"
        class="q-mt-md"
        @click="loggedInUser ? transfer(header === DAC_TOKEN) : $store.dispatch('ual/renderLoginModal')"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      DAC_TOKEN: process.env.DAC_TOKEN,
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
    transfer(isDacToken) {
      this.scrollPageToBottomIfNeeded();
      if (!this.isAgree) {
        this.onCheckboxError();
        return;
      }

      this.$store.commit("ual/setPayTokenInfo", { isDacToken, tokenQuantity: this.quantity });
      this.$router.push("/dac-creation");
    },
    scrollPageToBottomIfNeeded() {
      if (window.innerWidth > 1059) {
        return;
      }
      window.scrollTo({
        top: document.documentElement.offsetHeight - window.innerHeight
      });
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
  @media (min-width 769px) and (max-width 909px)
    width 180px
.first-card
  margin-right 50px
  @media (min-width 769px) and (max-width 909px)
    margin-right 10px
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
.quantity
  display flex
  flex-direction column
  align-items center
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
  & > button
    margin 0
@media (max-width 479px)
  .first-card
    margin 0
  .second-card
    margin-top 30px
</style>
