<template>
  <div>
    <div class=" row q-col-gutter-md ">
      <div class=" col-xs-4">
        <integer-input
          v-model="thresholdHigh"
          label="High"
          :max="4"
        />
      </div>
      <div class=" col-xs-4">
        <integer-input
          v-model="thresholdMed"
          label="Med"
          :max="thresholdHigh - 1 < 0 ? 0 : thresholdHigh - 1"
        />
      </div>
      <div class=" col-xs-4">
        <integer-input
          v-model="thresholdLow"
          label="Low"
          :max="thresholdMed - 1 < 0 ? 0 : thresholdMed - 1"
        />
      </div>
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
    methods: {
      handleKeyDown($event) {
        let keycode = $event.keyCode ? $event.keyCode : $event.which;
        console.log(keycode);
        if (keycode === 190 || keycode === 110 || keycode === 229) {
          $event.preventDefault();
        }
      }
    }
  };
</script>
