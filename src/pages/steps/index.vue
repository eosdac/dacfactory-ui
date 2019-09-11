<template>
  <q-page padding class="bg-accent">
    <!-- content -->
    <div>Step {{getActiveStep}} of 6</div>
    <div>{{getStepsConfig[getActiveStep].title}}</div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep",
      getStepsConfig: "factory/getStepsConfig"
    })
  },


};
</script>

<style>
</style>
