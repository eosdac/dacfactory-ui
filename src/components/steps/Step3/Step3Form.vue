<template>
  <div>
    <div class="input-select-wrapper">
      <my-input
        type="number"
        color="secondary"
        label="Period Length"
        class="margin-bottom-14"
        :rules="[val => (!!val && /^\d+$/.test(val)) || $t('errors.only_digits_are_available')]"
        v-model="periodLength"
        @statusChange="onStatusChange($event, 'periodLength')"
      />
      <q-select
        outlined
        dark
        v-model="periodLengthSelect"
        color="secondary"
        class="align-self-start"
        :options="TIME_PERIOD_OPTIONS"
        @input="onStatusChange({ value: $event }, 'periodLengthSelect')"
      />
    </div>
    <custom-divider />
    <my-input
      type="number"
      color="secondary"
      label="Number elected"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('errors.only_digits_are_available')]"
      v-model="numberElected"
      @statusChange="onStatusChange($event, 'numberElected')"
    />
    <my-input
      type="number"
      color="secondary"
      label="Max Votes"
      class="margin-bottom-14"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('errors.only_digits_are_available')]"
      v-model="maxVotes"
      @statusChange="onStatusChange($event, 'maxVotes')"
    />
  </div>
</template>

<script>
import MyInput from "components/form/my-input";
import CustomDivider from "./CustomDivider";

import { TOKENS_OPTIONS, TIME_PERIOD_OPTIONS } from "store/factory/state";

export default {
  components: {
    MyInput,
    CustomDivider
  },
  data() {
    const {
      periodLength,
      periodLengthSelect,
      numberElected,
      maxVotes
    } = this.$store.state.factory.stepsData[3];
    return {
      periodLength,
      periodLengthSelect,
      numberElected,
      maxVotes,
      TOKENS_OPTIONS,
      TIME_PERIOD_OPTIONS
    };
  },
  methods: {
    onStatusChange(data, key) {
      this.$store.commit("factory/setStepsData", { step: 3, key, data });
    }
  }
};
</script>

<style scoped lang="stylus">
.margin-bottom-14
  margin-bottom 14px
.input-select-wrapper
  display grid
  grid-template-columns 2fr 1fr
  grid-gap 28px
.align-self-start
  align-self start
</style>
