<template>
  <div>
    <my-input
      color="secondary"
      :label="`${$t('step3.number_of_c')} *`"
      :rules="[
        val => !!val || $t('general.required'),
        val => (val && /^\d+$/.test(val)) || $t('errors.only_positive_integers_are_available'),
        val => val > 0 || $t('errors.greater_then_null'),
        val => val >= 2 || $t('errors.not_less_than', { min_value: 2 })
      ]"
      :isSetFocus="focused === 'numberOfCustodians'"
      v-model="numberOfCustodians"
      @statusChange="onStatusChange($event, 'numberOfCustodians')"
    />
    <my-input
      color="secondary"
      :label="`${$t('step3.number_of_v_per_t')} *`"
      class="margin-bottom-14"
      :rules="[
        val => !!val || $t('general.required'),
        val => (val && /^\d+$/.test(val)) || $t('errors.only_positive_integers_are_available'),
        val => val > 0 || $t('errors.greater_then_null')
      ]"
      :isSetFocus="focused === 'numberOfVotes'"
      v-model="numberOfVotes"
      @statusChange="onStatusChange($event, 'numberOfVotes')"
    />
    <custom-divider />
    <div class="input-select-wrapper">
      <my-input
        color="secondary"
        :label="`${$t('step3.length_of_c_term')} *`"
        :rules="[
          val => !!val || $t('general.required'),
          val => (val && /^\d+$/.test(val)) || $t('errors.only_positive_integers_are_available'),
          val => val > 0 || $t('errors.greater_then_null')
        ]"
        v-model="periodLength"
        :isSetFocus="focused === 'periodLength'"
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
  </div>
</template>

<script>
import { findStepErrors } from "imports/utils";

import MyInput from "components/form/my-input";
import CustomDivider from "./CustomDivider";

import { TOKENS_OPTIONS, TIME_PERIOD_OPTIONS } from "store/factory/state";
import { CHECK_ERROR_TIMEOUT } from "components/constants";

export default {
  components: {
    MyInput,
    CustomDivider
  },
  data() {
    const {
      periodLength,
      periodLengthSelect,
      numberOfCustodians,
      numberOfVotes
    } = this.$store.state.factory.stepsData[3];
    return {
      periodLength,
      periodLengthSelect,
      numberOfCustodians,
      numberOfVotes,
      TOKENS_OPTIONS,
      TIME_PERIOD_OPTIONS,
      focused: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.focused = findStepErrors(this.$store.state.factory.stepsData[3]);
    }, CHECK_ERROR_TIMEOUT);
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
