<template>
  <div>
    <div class="text-subtitle text-grey-4 q-mb-sm">Lockup Asset & amount</div>
    <find-account />
    <p class="text-subtitle text-grey-4 q-my-sm">Vote Thresholds</p>
    <vote-threshold />
  </div>
</template>

<script>
import findAccount from 'components/form/find-account';
import voteThreshold from 'components/form/vote-threshold';

export default {
  components:{
    findAccount,
    voteThreshold
  }
}
</script>

<style>
.q-slider--dark .q-slider__track-markers {
  color:var(--q-color-accent) !important;
}
</style>
