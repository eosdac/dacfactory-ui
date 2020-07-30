<template>
  <q-page class="bg-accent content-wrapper">
    <section v-if="trxSuccess && !isValidationStage">
      <p :class="['title', { 'creation-success': creationFinishedText }]">
        {{ creationFinishedText ? creationFinishedText : $t("dac_creation.wait_until_dac_created") }}
      </p>
      <p class="status-text">{{ currentMessage }}</p>
      <progress-icons :currentNumber="currentNumber" />
      <q-btn
        color="secondary"
        :label="$t('general.continue')"
        :class="{ 'visibility-hidden': !creationFinishedText }"
        @click="setValidationStage"
      />
    </section>
    <dac-validation v-else-if="isValidationStage" :setDacValidated="setDacValidated" />
    <section v-else-if="trxError || wsError">
      <p class="title creation-fail break-text">{{ trxError || wsError }}</p>
      <q-btn type="a" href="/" color="secondary" :label="$t('dac_creation.go_to_main_page')" />
    </section>
  </q-page>
</template>

<script>
import ProgressIcons from "components/dacCreation/ProgressIcons";
import DacValidation from "components/dacCreation/DacValidation";

const CLIENT_BUILD_COMPLETE_STEP = "CLIENT BUILD COMPLETE";

export default {
  components: {
    ProgressIcons,
    DacValidation
  },
  data() {
    return {
      currentMessage: "",
      currentNumber: 0,
      wsError: null,
      trxSuccess: null,
      trxError: null,
      creationFinishedText: "",
      isValidationStage: false,
      isDacValidated: false
    };
  },
  mounted() {
    if (this.$store.getters["factory/getDacId"]) {
      this.setValidationStage();
    } else {
      this.$store.dispatch("ual/prepareDacTransact", { openWS: this.openWS, afterTransact: this.afterTransact });
    }
  },
  destroyed() {
    this.$store.commit("ual/setPaymentInfo", null);
    this.$store.commit("factory/setCustomDacData", null);
  },
  methods: {
    openWS(dacId) {
      return new Promise((resolve, reject) => {
        this.ws = new WebSocket(process.env.DAC_CREATION_WS);

        this.ws.onopen = () => {
          this.ws.send(JSON.stringify({ type: "register", data: { dac_id: dacId } }));
          resolve();
        };
        this.ws.onmessage = msg => {
          this.currentMessage = JSON.parse(msg.data).data.status.replace(/_/g, " ");
          this.currentNumber++;
          if (this.currentMessage === CLIENT_BUILD_COMPLETE_STEP) {
            this.creationFinishedText = this.$t("dac_creation.dac_was_created");
            this.$store.commit("factory/setDacId", dacId);
          }
        };
        this.ws.onerror = error => {
          this.wsError = this.$t("dac_creation.ws_error");
          this.ws.close();
          console.log(error, "error");
        };
        this.ws.onclose = () => {
          reject();
        };
      });
    },
    afterTransact(message) {
      if (!message) {
        this.trxSuccess = true;
      } else {
        this.trxError = message;
        this.ws.close();
      }
    },
    setValidationStage() {
      this.isValidationStage = true;
    },
    setDacValidated(isValidationFinished) {
      this.isDacValidated = isValidationFinished;
    }
  },
  beforeRouteEnter(to, from, next) {
    switch (true) {
      case from.path === "/create/step5":
        next();
        break;
      case !from.matched.length:
        next(from.path);
        break;
      default:
        next(false);
    }
  },
  beforeRouteLeave(to, from, next) {
    switch (true) {
      case this.isDacValidated:
      case this.trxError || this.wsError:
        next();
        break;
      default:
        next(false);
    }
  }
};
</script>

<style scoped lang="stylus">
.content-wrapper
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 0 16px
  text-align center
.title
  margin: 0 0 30px
  font-size 40px
  font-weight 700
  line-height normal
.creation-success
  color $positive
.creation-fail
  color $negative
.status-text
  min-height 30px
  margin-bottom 30px
  font-size 20px
  font-weight 500
.visibility-hidden
  visibility hidden
</style>
