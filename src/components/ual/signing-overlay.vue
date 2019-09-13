<template>
  <q-dialog v-model="getSigningOverlay.show" maximized persistent>
    <div class="fit row items-center justify-center">
      <q-btn
        round
        icon="close"
        @click="$store.commit('ual/setSigningOverlay', {show: false})"
        class="absolute-top-right q-mt-md q-mr-md"
        color="accent"
      />
      <div class="column items-center">
        <q-icon v-if="getSigningOverlay.status === 0" name="vpn_key" color="primary" size="60px" />
        <q-icon v-if="getSigningOverlay.status === 1" name="check" color="positive" size="60px" />
        <q-icon v-if="getSigningOverlay.status === 2" name="error" color="negative" size="60px" />
        <div :class="getMessageClass">{{getSigningOverlay.msg}}</div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "signingOverlay",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getSigningOverlay: "ual/getSigningOverlay"
    }),
    getMessageClass(){
      let res;
      switch (this.getSigningOverlay.status) {
        case 0:
          res = 'text-white';
          break;
        case 1:
          res = 'text-positive';
          break;
        case 2:
          res = 'text-negative text-weight-bold';
          break;
        default:
          break;
      }
      return res;
    }
  }
};
</script>

<style>
</style>
