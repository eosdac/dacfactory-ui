<template>
  <q-page padding class="bg-accent">
    <!-- content -->
    {{getStepsConfig[getActiveStep].title}}
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
