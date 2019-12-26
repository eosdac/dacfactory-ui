<template>
  <div>
    <div class="row text-caption justify-end text-secondary text-weight-bold" style="height:20px">
      <span>{{ parseLocalizedSupply(issuance) }}</span>
      <span class="q-ml-xs" v-if="parseLocalizedSupply(issuance)">{{ getTokenSymbol }}</span>
    </div>
    <my-input
      v-model="issuance"
      color="secondary"
      :label="`${$t('step2.issuance')} ${getTokenSymbol} *`"
      :hint="$t('step2.issuance_hint')"
      :rules="[
        val => !!val || $t('general.required'),
        val => /^\d+$/.test(val) || $t('errors.only_positive_integers_are_available'),
        val => val > 0 || $t('errors.greater_then_null'),
        val => val < MAX_SUPPLY_VALUE || $t('step2.less_than_supply', { max_supply: MAX_SUPPLY_VALUE })
      ]"
      @statusChange="$store.commit('factory/setStepsData', { step: 2, key: 'issuance', data: $event })"
      :isSetFocus="focused === 'issuance'"
    />
    <div class="q-mt-xs">
      <div class="row justify-between text-subtitle1">
        <div class="text-grey-4">{{ $t("step2.decimals") }}: {{ decimals }}</div>
        <div class="text-secondary text-weight-bold">{{ parseDecimals }}</div>
      </div>
      <q-slider
        dark
        :value="parseInt(decimals)"
        @input="onInputSlider"
        markers
        label
        :min="0"
        :max="8"
        color="secondary"
        class="q-mt-md"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { findStepErrors } from "imports/utils";

import myInput from "components/form/my-input";

import { CHECK_ERROR_TIMEOUT, MAX_SUPPLY_VALUE } from "components/constants";

export default {
  components: {
    myInput
  },
  data() {
    return {
      decimals: this.$store.state.factory.stepsData[2].decimals,
      issuance: this.$store.state.factory.stepsData[2].issuance,
      MAX_SUPPLY_VALUE,
      focused: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.focused = findStepErrors(this.$store.state.factory.stepsData[2]);
    }, CHECK_ERROR_TIMEOUT);
  },
  computed: {
    ...mapGetters({
      getTokenSymbol: "factory/getTokenSymbol"
    }),
    parseDecimals() {
      let string = "";
      if (this.decimals) {
        string += ".";
        for (let i = 0; i < this.decimals; i++) {
          string += "0";
        }
      }
      return string;
    }
  },
  methods: {
    parseLocalizedSupply(v) {
      if (!v) {
        return "";
      }
      return parseInt(v).toLocaleString();
    },
    onInputSlider(event) {
      this.decimals = event;
      this.$store.commit("factory/setStepsData", { step: 2, key: "decimals", data: { value: event } });
    }
  }
};
</script>

<style>
.q-slider--dark .q-slider__track-markers {
  color: var(--q-color-accent) !important;
}
</style>
