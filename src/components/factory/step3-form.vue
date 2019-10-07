<template>
  <div>
    <div class="text-subtitle text-grey-4 q-mb-sm">Lockup Asset & amount</div>
    <extended-asset />
    <p class="text-subtitle text-grey-4 q-my-sm">Vote Thresholds</p>
    <vote-threshold />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import myInput from 'components/form/my-input';
import extendedAsset from 'components/form/extended-asset';
import voteThreshold from 'components/form/vote-threshold';
// import {
//   isValidAccountName,
//   isAvailableAccountName
// } from "../../imports/validators";
export default {
  components:{
    myInput,
    voteThreshold,
    extendedAsset
  },
  data () {
    return {
      maxSupply: this.$store.state.factory.stepsData[3].maxSupply,
      decimals: Number(this.$store.state.factory.stepsData[3].decimals)
    }
  }
}
</script>

<style>
.q-slider--dark .q-slider__track-markers {
  color:var(--q-color-accent) !important;
}
</style>
