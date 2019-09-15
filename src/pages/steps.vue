<template>

  <q-page  class="bg-accent column ">

    <div  :class="$q.screen.gt.xs ? 'row': 'column'" style="flex:1" :key="`i${getActiveStep}`">
      <div style="flex:1" class="bg-accent">
        <div class="row justify-end q-pl-md q-pt-xl overflow-hidden" :class="$q.screen.gt.md ? 'q-pr-xxl': 'q-pr-md'">
          <!-- {{$q.screen.gt.xs ? 'row': 'column'}} -->
          <div class="col-xs-12 col-lg-6">
            <div >
              <div class="text-h6 text-weight-thin ">Step {{getActiveStep}} of 6</div>
              <div class="text-h5 q-mb-lg">{{getStepTitle}}</div>
            </div>
            
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOut" mode="out-in" appear>
            <step1-form v-if="getActiveStep==1" key="s1"/>
            <step2-form v-else-if="getActiveStep==2" key="s2"/>
            <q-btn v-else label="test trx" @click="transfer" color="secondary" class="q-mt-md" key="s2" />
            </transition>

          </div>
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
import step1Form from 'components/factory/step1-form';
import step2Form from 'components/factory/step2-form'
export default {
  components:{
    step1Form,
    step2Form
  },
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
