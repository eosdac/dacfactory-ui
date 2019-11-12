<template>
  <q-page class="bg-accent hack-height">
    <section class="content-wrapper" v-if="trxSuccess && !wsError">
      <p class="title">
        {{ creationFinishedText ? creationFinishedText : "Please, wait while your DAC is being created" }}
      </p>
      <p class="status-text" v-if="!creationFinishedText">{{ currentMessage }}</p>
      <!--<progress-bar :filled="doneCounter / stepsNumber" />-->
      <router-link to="/" v-if="creationFinishedText" class="go-to-main-link">GO TO MAIN PAGE</router-link>
    </section>
    <section class="content-wrapper" v-else-if="trxError || wsError">
      <p class="title" style="color:red">{{ trxError || wsError }}</p>
      <router-link to="/" class="go-to-main-link">Go to main page</router-link>
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
      doneCounter: 0,
      /*stepsNumber: 20,*/
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
    this.$store.commit("ual/setPayTokenInfo", null);
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
      ws.onclose = () => {
        this.creationFinishedText = "Your DAC was successfully created!";
        this.$store.commit("ual/setPayTokenInfo", null);
      };
    },
    afterTransact(message) {
      if (!message) {
        this.trxSuccess = true;
      } else {
        this.trxError = message;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/create/step5") {
      next()
    } else {
      if (from.path === '/') {
        if (from.matched.length > 0) {
          next(false)
        } else {
          next(from.path)
        }
      } else {
        next(false)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/create/step5") {
      next(false);
    } else {
      next()
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
.go-to-main-link
  padding 6px 16px
  font-size 14px
  font-weight 500
  text-decoration none
  border-radius 4px
  background-color $secondary
  transition background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
  color #ffffff
  &:focus,
  &:hover
    background-color #8954c0
@media (max-width 479px)
  .title
    font-size 30px
  .status-text
    font-size 14px
  .go-to-main-link
    font-size 12px
</style>
