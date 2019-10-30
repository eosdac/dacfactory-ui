<template>
  <q-page class="bg-accent hack-height" v-if="dacId">
    <section class="content-wrapper">
      <h1 class="title">{{ wsError ? wsError : "Please, wait while your dac will be created" }}</h1>
      <p class="status-text">{{ currentMessage }}</p>
      <progress-bar :filled="doneCounter / stepsNumber" />
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
      currentMessage: "connecting...",
      dacId: this.$store.state.ual.dacId,
      doneCounter: 0,
      stepsNumber: 20,
      wsError: null
    };
  },
  mounted() {
    if (!this.dacId) {
      this.$router.push("/");
      return;
    }
    const ws = new WebSocket(process.env.DAC_CREATION_WS);

    ws.onopen = () => {
      //ws.send(JSON.stringify({ type: "register", data: { dac_id: this.dacId } }));
    };
    ws.onmessage = msg => {
      console.log(msg, "msg");
      this.currentMessage = msg.data;
      this.doneCounter++;
    };
    ws.onerror = () => {
      this.wsError = "Error occurred. Please try again";
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    };
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
