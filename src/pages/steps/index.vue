<template>
  <q-page padding class="bg-accent">
    <!-- content -->
    <div>Step {{getActiveStep}} of 6</div>
    <div>{{getStepTitle}}</div>
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
