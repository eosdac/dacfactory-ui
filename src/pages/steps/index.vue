<template>
  <q-page padding class="bg-accent">
    <!-- content -->
    {{getActiveStep}}
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      getActiveStep: "factory/getActiveStep",
    })
  },


};
</script>

<style>
</style>
