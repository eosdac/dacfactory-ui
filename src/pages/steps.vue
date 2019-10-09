<template>
  <q-page class="bg-accent column">
    <div :class="$q.screen.gt.xs ? 'row' : 'column'" style="flex:1" :key="`i${getActiveStep}`">
      <div style="flex:1" class="bg-accent">
        <div
          class="row justify-end q-pl-md q-pt-xl q-pb-xl overflow-hidden"
          :class="$q.screen.gt.md ? 'q-pr-xxl' : 'q-pr-md'"
        >
          <!-- {{$q.screen.gt.xs ? 'row': 'column'}} -->
          <div class="col-xs-12 col-lg-6">
            <div>
              <div class="text-h6 text-weight-thin ">
                {{ $t("general.step_of", { active_step: getActiveStep, max_steps: stepsNumber }) }}
              </div>
              <h1 class="text-h5 q-mb-lg">{{ $t("step" + getActiveStep + ".title") }}</h1>
            </div>
            <transition
              enter-active-class="animated fadeInUp"
              leave-active-class="animated fadeOut"
              mode="out-in"
              appear
            >
              <step1-form v-if="getActiveStep === 1" key="s1" />
              <step2-form v-else-if="getActiveStep === 2" key="s2" />
              <step3-form v-else-if="getActiveStep === 3" key="s3" />
              <step4-form v-else-if="getActiveStep === 4" key="s4" />
              <q-btn v-else label="test trx" @click="transfer" color="secondary" class="q-mt-md" key="s5" />
            </transition>
            <transition
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOut"
              mode="out-in"
              appear
            >
              <q-btn
                v-if="getActiveStep < stepsNumber"
                :label="$t('general.continue')"
                :to="`/create/step${getActiveStep + 1}`"
                color="secondary"
                class="q-mt-lg full-width"
                :key="`continue${getActiveStep}`"
              />
            </transition>
          </div>
        </div>
      </div>

      <div style="flex:1" class="bg-primary">
        <div class="q-pa-md">
          <div v-if="getActiveStep === 1">
            <p>
              {{ $t("step1.info_line1") }}
            </p>
            <p>
              {{ $t("step1.info_line2") }}
            </p>
            <p>
              {{ $t("step1.info_line3") }}
            </p>
            <p>
              {{ $t("step1.info_line4") }}
            </p>
            <p>
              {{ $t("step1.info_line5") }}
            </p>
          </div>
          <div v-if="getActiveStep === 2">
            <p>
              {{ $t("step2.info_line1") }}
            </p>
            <p>
              {{ $t("step2.info_line2") }}
            </p>
          </div>
          <div v-if="getActiveStep === 3">
            <p>
              {{ $t("step3.info_line1") }}
            </p>
          </div>
          <div v-if="getActiveStep === 4">
            <step4-right />
          </div>
          <div v-if="getActiveStep === 5">
            <p>
              {{ $t("step5.info_line1") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import { STEPS_NUMBER } from "components/constants/common";

import Step1Form from "components/steps/Step1Form";
import Step2Form from "components/steps/Step2Form";
import Step3Form from "components/steps/Step3Form";
import Step4Form from "components/steps/Step4/Step4Form";
import Step4Right from "components/steps/Step4/Step4Right";

// import clientPreview from 'components/steps/client-preview';

export default {
  data() {
    return {
      stepsNumber: STEPS_NUMBER
    };
  },
  components: {
    Step1Form,
    Step2Form,
    Step3Form,
    Step4Form,
    Step4Right
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveStep: "factory/getActiveStep"
    })
  },
  methods: {
    async transfer() {
      let actions = [
        {
          account: "eosio.token",
          name: "transfer",
          data: {
            from: this.getAccountName,
            to: "piecesnbitss",
            quantity: "1.0000 EOS",
            memo: ""
          }
        }
      ];
      this.$store.dispatch("ual/transact", { actions: actions });
    }
  }
};
</script>

<style scoped>
  h1 {
    margin-top: 0;
  }
</style>
