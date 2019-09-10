<template>
  <q-page class="bg-primary position-relative" >
    <div class="landing-page-wrapper">
      <div class="q-pa-md" >
        <div class="text-center text-white">
          <div class="text-h6">Welcome To</div>
          <div class="text-weight-bold text-h1">DAC</div>
          <div class="text-h5" style="letter-spacing: 3px;">• FACTORY •</div>

          <div class="row justify-center text-body1 q-mt-xl">
            <div
              style="max-width:500px"
            >Create a Decentralized Autonomous Community (DAC) to fit the needs of your organization and community.</div>
          </div>
          <div class="text-body1 q-mt-xl">Get started with these X steps</div>
          <div class="row justify-center q-mt-sm">
            <q-btn color="secondary" label="create my dac" style="width:180px" class="q-py-sm" />
          </div>
        </div>

        <q-btn v-if="getAccountName" label="test transfer" @click="transfer" color="info" />


      </div>

      <div v-if="true" class="q-mt-lg landing-page-skew mobile-hide" style="z-index:-1"></div>

 

    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    dologin() {},
    async transfer() {
      let actions = [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: this.getAccountName,
            to: "piecesnbitss",
            quantity: "1.0000 EOS",
            memo: ""
          }
        }
      ];
      this.$store.dispatch("ual/transact", { actions: actions });
    }
  }
};
</script>

<style>
.landing-page-wrapper{
  position:absolute;
  width:100%;
  overflow-y:hidden;
  top:0;
  bottom:0;
}
.landing-page-skew{
  background:#1E2128; border-top:40px solid #763CB5; height:1000px;
  animation: 1s ease-out 0s 1 skew;
  animation-fill-mode:forwards;
}

@keyframes skew {
    0% {
        transform: skew(0deg, 0deg);
    }
    100% {
        transform: skew(0deg, -8deg);
    }
}
</style>
