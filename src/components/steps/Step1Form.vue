<template>
  <div class="overflow-hidden">
    <my-input
      :value="dacName"
      @input="dacName = $event.trim()"
      color="secondary"
      :label="`${$t('step1.dac_name')} *`"
      :isSetFocus="focused === 'dacName'"
      :rules="[val => !!val || $t('general.required'), val => val.length >= 3 || $t('step1.dac_name_rule_length_3')]"
      @statusChange="$store.commit('factory/setStepsData', { step: 1, key: 'dacName', data: $event })"
    />
    <my-input
      :value="tokenSymbol"
      @input="tokenSymbol = $event.trim().toUpperCase()"
      color="secondary"
      :label="`${$t('step1.token_symbol')} *`"
      :isSetFocus="focused === 'tokenSymbol'"
      maxlength="7"
      :rules="[
        val => !!val || $t('general.required'),
        isValidSymbol,
        val => val.length >= 3 || $t('step1.token_symbol_rule_length_3'),
        isAvailableSymbol
      ]"
      @statusChange="$store.commit('factory/setStepsData', { step: 1, key: 'tokenSymbol', data: $event })"
    />
    <q-input
      type="textarea"
      outlined
      dark
      counter
      maxlength="250"
      color="secondary"
      ref="textarea_ref"
      :value="dacDescription"
      @input="
        dacDescription = $event;
        $store.commit('factory/setStepsData', { step: 1, key: 'dacDescription', data: { value: $event } })"
      :label="$t('step1.description')"
      class="q-mb-md overflow-hidden"
    ></q-input>
  </div>
</template>

<script>
import { findStepErrors } from "imports/utils";
import { isValidSymbol, isAvailableSymbol } from "imports/validators";

import myInput from "components/form/my-input";

export default {
  components: {
    myInput
  },
  data() {
    const { dacName, tokenSymbol, dacDescription } = this.$store.state.factory.stepsData[1];

    return {
      dacName,
      tokenSymbol,
      dacDescription,
      focused: null
    };
  },
  mounted() {
    this.focused = findStepErrors(this.$store.state.factory.stepsData[1]);
    if (!this.focused && !this.dacDescription) {
      this.$refs.textarea_ref.focus()
    }
  },
  methods: {
    isValidSymbol,
    isAvailableSymbol
  }
};
</script>
