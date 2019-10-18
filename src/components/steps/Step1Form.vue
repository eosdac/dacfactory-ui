<template>
  <div class="overflow-hidden">
    <my-input
      :value="dacName"
      @input="dacName = $event.trim()"
      color="secondary"
      :label="$t('step1.dac_name')"
      :hint="$t('step1.dac_name_hint')"
      :rules="[val => !!val || $t('general.required'), val => val.length >= 3 || $t('step1.dac_name_rule_length_3')]"
      @statusChange="$store.commit('factory/setStepsData', { step: 1, key: 'dacName', data: $event })"
    />
    <my-input
      :value="tokenSymbol"
      @input="tokenSymbol = $event.trim().toUpperCase()"
      color="secondary"
      :label="$t('step1.token_symbol')"
      :hint="$t('step1.token_symbol_hint')"
      maxlength="7"
      :rules="[
        val => !!val || $t('general.required'),
        isValidSymbol,
        val => val.length >= 3 || $t('step1.symbol_rule_length_3'),
        val => val.length <= 7 || $t('step1.symbol_rule_length_7'),
        isAvailableSymbol
      ]"
      @statusChange="$store.commit('factory/setStepsData', { step: 1, key: 'tokenSymbol', data: $event })"
    />
    <q-input
      type="textarea"
      outlined
      dark
      :value="dacDescription"
      @input="
        dacDescription = $event;
        $store.commit('factory/setStepsData', { step: 1, key: 'dacDescription', data: { value: $event } });
      "
      maxlength="250"
      counter
      color="secondary"
      :label="$t('step1.description')"
      :hint="$t('step1.description_hint')"
      class="q-mb-md overflow-hidden"
    >
      <template v-slot:append class="overflow-hidden">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" mode="out-in">
          <q-icon v-if="dacDescription" name="check" color="positive" key="ok" />
        </transition>
      </template>
    </q-input>
  </div>
</template>

<script>
import myInput from "components/form/my-input";
import { isValidSymbol, isValidUrl, isAvailableSymbol } from "imports/validators";

export default {
  components: {
    myInput
  },
  data() {
    return {
      dacName: this.$store.state.factory.stepsData[1].dacName,
      tokenSymbol: this.$store.state.factory.stepsData[1].tokenSymbol,
      dacId: this.$store.state.factory.stepsData[1].dacId,
      dacDescription: this.$store.state.factory.stepsData[1].dacDescription
    };
  },
  methods: {
    isValidSymbol,
    isValidUrl,
    isAvailableSymbol
  }
};
</script>

<style></style>
