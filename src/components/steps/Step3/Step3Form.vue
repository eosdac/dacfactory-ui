<template>
  <div>
    <my-input
      type="number"
      color="secondary"
      label="Lockup Asset"
      hint="See LockUp Asset"
      :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
      v-model="lockupAsset"
      @statusChange="onStatusChange($event, 'lockupAsset')"
    />
    <my-input
      type="number"
      color="secondary"
      label="Request Pay"
      :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
      v-model="requestPay"
      @statusChange="onStatusChange($event, 'requestPay')"
    />
    <div class="lockup-wrapper">
      <my-input
        type="number"
        color="secondary"
        label="Lockup"
        :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
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
        label="Release"
        @input="onStatusChange({ value: $event }, 'lockupSelect')"
      />
    </div>
    <my-input
      type="number"
      color="secondary"
      label="Period Length"
      class="margin-bottom-14"
      :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
      v-model="periodLength"
      @statusChange="onStatusChange($event, 'periodLength')"
    />
    <custom-divider />
    <my-input
      type="number"
      color="secondary"
      label="Number elected"
      :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
      v-model="numberElected"
      @statusChange="onStatusChange($event, 'numberElected')"
    />
    <vote-threshold />
    <my-input
      type="number"
      color="secondary"
      label="Max Votes"
      class="max-votes"
      :rules="[val => !!val && /^\d+$/.test(val) || $t('step3.only_digits_are_available')]"
      v-model="maxVotes"
      @statusChange="onStatusChange($event, 'maxVotes')"
    />
    <custom-divider />
    <my-input
      type="number"
      color="secondary"
      label="Vote Quorum Percent"
      iconLeft="<span style='display: flex; font-size: 18px'>%</p>"
      :rules="[val => (val !== '' && val >= 0 && val <= 100) || $t('step3.percent_error')]"
      v-model="voteQuorumPercent"
      @statusChange="onStatusChange($event, 'voteQuorumPercent')"
    />
  </div>
</template>

<script>
import VoteThreshold from "components/form/vote-threshold";
import MyInput from "components/form/my-input";
import CustomDivider from "./CustomDivider";

export default {
  components: {
    VoteThreshold,
    MyInput,
    CustomDivider
  },
  data() {
    return {
      lockupAsset: this.$store.state.factory.stepsData[3].lockupAsset,
      requestPay: this.$store.state.factory.stepsData[3].requestPay,
      lockup: this.$store.state.factory.stepsData[3].lockup,
      lockupSelect: this.$store.state.factory.stepsData[3].lockupSelect,
      periodLength: this.$store.state.factory.stepsData[3].periodLength,
      numberElected: this.$store.state.factory.stepsData[3].numberElected,
      maxVotes: this.$store.state.factory.stepsData[3].maxVotes,
      voteQuorumPercent: this.$store.state.factory.stepsData[3].voteQuorumPercent,
      '..asa--er': 878
    };
  },
  methods: {
    onStatusChange(data, key) {
      this.$store.commit("factory/setStepsData", { step: 3, key, data });
    }
  }
};
</script>

<style scoped>
.margin-bottom-14 {
  margin-bottom: 14px;
}
.max-votes {
  margin: 20px 0 14px;
}
.lockup-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 28px;
}
</style>
