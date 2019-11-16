<template>
  <q-page class="bg-accent hack-height">
    <section class="content-wrapper" v-if="trxSuccess && !wsError">
      <p :class="['title', { 'creation-success': creationFinishedText }]">
        {{ creationFinishedText ? creationFinishedText : "Please, wait while your DAC will be created" }}
      </p>
      <p class="status-text">{{ currentMessage }}</p>
      <progress-icons :currentNumber="currentNumber" />
      <router-link to="/" :class="['go-to-main-link', { 'visibility-hidden': !creationFinishedText }]">
        GO TO MAIN PAGE</router-link
      >
    </section>
    <section class="content-wrapper" v-else-if="trxError || wsError">
      <p :class="['title', 'creation-fail']">{{ trxError || wsError }}</p>
      <router-link to="/" class="go-to-main-link">GO TO MAIN PAGE</router-link>
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
    this.$store.commit("ual/setPayTokenInfo", null);
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
            this.creationFinishedText = "Your DAC was successfully created!";
            this.$store.commit("factory/resetState");
            this.$store.commit("ual/setPayTokenInfo", null);
          }
        };
        this.ws.onerror = error => {
          this.wsError = "WS error occurred.";
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
    } else {
      next();
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
  margin: 0 0 30px
  font-size 40px
  font-weight 700
  line-height normal
  text-align center
.creation-success
  color $positive
.creation-fail
  color $negative
.status-text
  height 30px
  margin-bottom 30px
  font-size 20px
  font-weight 500
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
.visibility-hidden
  visibility hidden
@media (max-width 479px)
  .title
    font-size 30px
  .status-text
    font-size 14px
  .go-to-main-link
    font-size 12px
  .status-text
    height 21px
</style>
