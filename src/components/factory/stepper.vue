<template>
  <div>
    <q-linear-progress dark :value="step/10" color="secondary" />
    <div class="q-px-xl q-pb-md row justify-end">
      <q-btn color="secondary" label="step 1: create dac" class="q-mt-sm" icon-right="ion-arrow-forward" />
    </div>
    
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      step: 1
    }
  }
}
</script>

<style>
</style>
