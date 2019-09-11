<template>
  <q-page  class="bg-accent column">
    <!-- content -->

    <div class="row" style="flex:1" >
      <div style="flex:1" class="bg-accent">
        <div class="q-pa-md">
        <div>Step {{getActiveStep}} of 6</div>
        <div>{{getStepTitle}}</div>
        </div>
      </div>
      <div style="flex:1" class="bg-primary"></div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep",
      getStepsConfig: "factory/getStepsConfig"
    }),
    getStepTitle(){
      let conf = this.getStepsConfig[this.getActiveStep];
      return conf ? conf.title : false;
    }
  },


};
</script>

<style>
</style>
