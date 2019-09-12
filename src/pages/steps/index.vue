<template>
  <q-page  class="bg-accent column">

    <div  :class="$q.screen.gt.xs ? 'row': 'column'" style="flex:1" >
      <div style="flex:1" class="bg-accent">
        <div class="q-pa-md">
          <!-- {{$q.screen.gt.xs ? 'row': 'column'}} -->
          <div class="text-h6 text-weight-thin">Step {{getActiveStep}} of 6</div>
          <div class="text-h5">{{getStepTitle}}</div>
        </div>
      </div>
      <div style="flex:1" class="bg-primary">
        <div class="q-pa-md">
          bla bla bla
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
