<template>
  <q-page class="bg-accent hack-height" v-if="payTokenSymbol">
    <section class="content-wrapper" v-if="trxSuccess && !wsError">
      <p class="title">Please, wait while your dac will be created</p>
      <p class="status-text">{{ currentMessage }}</p>
      <!--<progress-bar :filled="doneCounter / stepsNumber" />-->
    </section>
    <section class="content-wrapper" v-else-if="trxError || wsError">
      <p class="title" style="color:red">{{ trxError || wsError }}</p>
    </section>
  </q-page>
</template>

<script>
import ProgressBar from "components/ProgressBar";

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      currentMessage: "",
      payTokenSymbol: this.$store.state.ual.payTokenSymbol,
      doneCounter: 0,
      /*stepsNumber: 20,*/
      wsError: null,
      trxSuccess: null,
      trxError: null
    };
  },
  mounted() {
    if (!this.payTokenSymbol) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("ual/prepareDacTransact", { openWS: this.openWS, afterTransact: this.afterTransact });
  },
  methods: {
    openWS(dacId) {
      const ws = new WebSocket(process.env.DAC_CREATION_WS);

      ws.onopen = () => {
        console.log("opened");
        ws.send(JSON.stringify({ type: "register", data: { dac_id: dacId } }));
      };
      ws.onmessage = msg => {
        console.log("msg", msg);
        this.currentMessage = msg.data;
        this.doneCounter++;
      };
      ws.onerror = error => {
        this.wsError = "WS error occurred.";
        console.log(error, "error");
      };
      ws.onclose = e => {
        this.wsError = "Connection's closed";
        console.log(e, "closed");
      };
    },
    afterTransact(message) {
      if (!message) {
        this.trxSuccess = true
      } else {
        this.trxError = message
      }
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
.title
  margin: 0 0 20px
  font-size 40px
  font-weight 700
  line-height normal
  text-align center
.status-text
  margin-bottom 20px
  font-size 20px
.hack-height
  height 1px
@media (max-width 479px)
  .title
    font-size 30px
  .status-text
    font-size 14px
</style>
