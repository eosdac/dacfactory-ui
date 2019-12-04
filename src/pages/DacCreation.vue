<template>
  <q-page class="bg-accent hack-height">
    <section class="content-wrapper" v-if="trxSuccess && !wsError">
      <p :class="['title', { 'creation-success': creationFinishedText }]">
        {{ creationFinishedText ? creationFinishedText : $t('dac_creation.wait_until_dac_created') }}
      </p>
      <p class="status-text">{{ currentMessage }}</p>
      <progress-icons :currentNumber="currentNumber" />
      <q-btn
        to="/"
        color="secondary"
        :label="$t('dac_creation.go_to_main_page')"
        :class="{ 'visibility-hidden': !creationFinishedText }"
      />
    </section>
    <section class="content-wrapper" v-else-if="trxError || wsError">
      <p class="title creation-fail break-text">{{ trxError || wsError }}</p>
      <q-btn
        to="/"
        color="secondary"
        :label="$t('dac_creation.go_to_main_page')"
      />
    </section>
  </q-page>
</template>

<script>
import ProgressIcons from "components/ProgressIcons";

const CLIENT_BUILD_COMPLETE = "CLIENT BUILD COMPLETE";

export default {
  components: {
    ProgressIcons
  },
  data() {
    return {
      currentMessage: "",
      currentNumber: 0,
      wsError: null,
      trxSuccess: null,
      trxError: null,
      creationFinishedText: ""
    };
  },
  mounted() {
    this.$store.dispatch("ual/prepareDacTransact", { openWS: this.openWS, afterTransact: this.afterTransact });
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
          if (this.currentMessage === CLIENT_BUILD_COMPLETE) {
            this.creationFinishedText = this.$t('dac_creation.dac_was_created');
            this.$store.commit("factory/resetFactoryState");
          }
        };
        this.ws.onerror = error => {
          this.wsError = this.$t('dac_creation.ws_error');
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
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/create/step5") {
      next();
    } else {
      if (from.path === "/") {
        if (from.matched.length > 0) {
          next(false);
        } else {
          next(from.path);
        }
      } else {
        next(false);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/create/step5") {
      next(false);
    } else if (this.creationFinishedText || this.trxError || this.wsError) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style scoped lang="stylus">
.content-wrapper
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 100%
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
.hack-height
  height 1px
.visibility-hidden
  visibility hidden
</style>
