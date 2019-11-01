<template>
  <div>
    <div class="row text-caption justify-end text-secondary text-weight-bold" style="height:20px">
      <span>{{ parseLocalizedSupply(maxSupply) }}</span>
      <span class="q-ml-xs" v-if="parseLocalizedSupply(maxSupply)">{{ getTokenSymbol }}</span>
    </div>
    <my-input
      type="number"
      v-model="maxSupply"
      color="secondary"
      :label="$t('step2.max_supply', { token_symbol: getTokenSymbol })"
      :hint="$t('step2.max_supply_hint')"
      :rules="[val => !!val || $t('general.required'), val => val > 0 || $t('step2.max_supply_rule_positive')]"
      @statusChange="$store.commit('factory/setStepsData', { step: 2, key: 'maxSupply', data: $event })"
      :debounce="0"
    />
    <div class="row text-caption justify-end text-secondary text-weight-bold" style="height:20px">
      <span>{{ parseLocalizedSupply(issuance) }}</span>
      <span class="q-ml-xs" v-if="parseLocalizedSupply(issuance)">{{ getTokenSymbol }}</span>
    </div>
    <my-input
      type="number"
      v-model="issuance"
      color="secondary"
      :label="$t('step2.issuance', { token_symbol: getTokenSymbol })"
      :hint="$t('step2.issuance_hint')"
      :rules="[val => !!val || $t('general.required'), val => val > 0 || $t('step2.max_supply_rule_positive')]"
      @statusChange="$store.commit('factory/setStepsData', { step: 2, key: 'issuance', data: $event })"
      :debounce="0"
    />
    <div class="q-mt-xs">
      <div class="row justify-between text-subtitle1">
        <div class="text-grey-4">{{ $t("step2.decimals") }}: {{ decimals }}</div>
        <div class="text-secondary text-weight-bold">{{ parseDecimals }}</div>
      </div>
      <q-slider
        dark
        :value="decimals"
        @input="
          decimals = $event;
          $store.commit('factory/setStepsData', { step: 2, key: 'decimals', data: { value: Number($event) } });
        "
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

import myInput from "components/form/my-input";

export default {
  components: {
    myInput
  },
  data() {
    return {
      maxSupply: this.$store.state.factory.stepsData[2].maxSupply,
      decimals: Number(this.$store.state.factory.stepsData[2].decimals),
      issuance: this.$store.state.factory.stepsData[2].issuance
    };
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
    }
  }
};
</script>

<style>
.q-slider--dark .q-slider__track-markers {
  color: var(--q-color-accent) !important;
}
</style>
