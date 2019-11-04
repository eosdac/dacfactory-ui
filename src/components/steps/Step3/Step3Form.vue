<template>
  <div>
    <my-input
      type="number"
      color="secondary"
      label="Lockup Asset"
      hint="See LockUp Asset"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
      v-model="lockupAsset"
      @statusChange="onStatusChange($event, 'lockupAsset')"
    />
    <my-input
      type="number"
      color="secondary"
      label="Max Request Pay"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
      v-model="maxRequestPay"
      @statusChange="onStatusChange($event, 'maxRequestPay')"
    />
    <div class="input-select-wrapper">
      <my-input
        type="number"
        color="secondary"
        label="Lockup"
        :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
        v-model="lockup"
        @statusChange="onStatusChange($event, 'lockup')"
      />
      <q-select
        outlined
        dark
        v-model="lockupSelect"
        color="secondary"
        :style="{ alignSelf: 'start' }"
        :options="['Hour(s)', 'Day(s)']"
        @input="onStatusChange({ value: $event }, 'lockupSelect')"
      />
    </div>
    <div class="input-select-wrapper">
    <my-input
      type="number"
      color="secondary"
      label="Period Length"
      class="margin-bottom-14"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
      v-model="periodLength"
      @statusChange="onStatusChange($event, 'periodLength')"
    />
      <q-select
        outlined
        dark
        v-model="periodLengthSelect"
        color="secondary"
        :style="{ alignSelf: 'start' }"
        :options="['Hour(s)', 'Day(s)']"
        @input="onStatusChange({ value: $event }, 'periodLengthSelect')"
      />
    </div>
    <custom-divider />
    <my-input
      type="number"
      color="secondary"
      label="Number elected"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
      v-model="numberElected"
      @statusChange="onStatusChange($event, 'numberElected')"
    />
    <my-input
      type="number"
      color="secondary"
      label="Max Votes"
      class="margin-bottom-14"
      :rules="[val => (!!val && /^\d+$/.test(val)) || $t('step3.only_digits_are_available')]"
      v-model="maxVotes"
      @statusChange="onStatusChange($event, 'maxVotes')"
    />
  </div>
</template>

<script>
import MyInput from "components/form/my-input";
import CustomDivider from "./CustomDivider";

export default {
  components: {
    MyInput,
    CustomDivider
  },
  data() {
    return {
      lockupAsset: this.$store.state.factory.stepsData[3].lockupAsset,
      maxRequestPay: this.$store.state.factory.stepsData[3].maxRequestPay,
      lockup: this.$store.state.factory.stepsData[3].lockup,
      lockupSelect: this.$store.state.factory.stepsData[3].lockupSelect,
      periodLength: this.$store.state.factory.stepsData[3].periodLength,
      periodLengthSelect: this.$store.state.factory.stepsData[3].periodLengthSelect,
      numberElected: this.$store.state.factory.stepsData[3].numberElected,
      maxVotes: this.$store.state.factory.stepsData[3].maxVotes
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
</style>
