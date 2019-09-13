<template>

  <q-page  class="bg-accent column">
    <div  :class="$q.screen.gt.xs ? 'row': 'column'" style="flex:1" :key="getActiveStep">
      <div style="flex:1" class="bg-accent">
        <div class="q-pa-md">
          <!-- {{$q.screen.gt.xs ? 'row': 'column'}} -->
          <div class="text-h6 text-weight-thin">Step {{getActiveStep}} of 6</div>
          <div class="text-h5">{{getStepTitle}}</div>
          <q-btn label="test trx" @click="transfer" color="secondary" class="q-mt-md" />
        </div>
      </div>
      <div style="flex:1" class="bg-primary">
        <div class="q-pa-md">
          info step {{getActiveStep}}
        </div>
      </div>
    </div>
  </q-page>
  
</template>

<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveStep: "factory/getActiveStep",
      getStepsConfig: "factory/getStepsConfig"
    }),
    getStepTitle(){
      let conf = this.getStepsConfig[this.getActiveStep];
      return conf ? conf.title : false;
    }
  },
  methods:{
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
</style>
