<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-4">
      <integer-input v-model="thresholdHigh" label="High" :max="4" />
    </div>
    <div class="col-xs-4">
      <integer-input v-model="thresholdMed" label="Med" :max="checkMedMax" />
    </div>
    <div class="col-xs-4">
      <integer-input v-model="thresholdLow" label="Low" :max="checkLowMax" />
    </div>
  </div>
</template>

<script>
import integerInput from "components/form/integer-input";

export default {
  name: "VoteThreshold",
  components: {
    integerInput
  },
  data() {
    return {
      thresholdHigh: 4,
      thresholdMed: 0,
      thresholdLow: 0
    };
  },
  computed: {
    checkMedMax() {
      const newMax = this.thresholdHigh - 1;
      return newMax < 0 ? 0 : newMax;
    },
    checkLowMax() {
      const newMax = this.thresholdMed - 1;
      return newMax < 0 ? 0 : newMax;
    }
  }
};
</script>
