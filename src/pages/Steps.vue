<template>
  <q-page class="bg-accent column">
    <div class="wrapper" :key="`i${getActiveStep}`">
      <div style="flex:1" class="bg-accent">
        <div
          class="row justify-end q-pl-md q-pt-xl q-pb-xl overflow-hidden"
          :class="$q.screen.gt.md ? 'q-pr-xxl' : 'q-pr-md'"
        >
          <div :class="getActiveStep !== 5 ? ['col-xs-12', 'col-lg-6'] : 'width-xl-screen'">
            <div class="text-h6 text-weight-thin">
              {{ $t("general.step_of", { active_step: getActiveStep, max_steps: stepsNumber }) }}
            </div>
            <h1 class="text-h5 q-mb-lg">{{ $t("step" + getActiveStep + ".title") }}</h1>
            <transition
              enter-active-class="animated fadeInUp"
              leave-active-class="animated fadeOut"
              mode="out-in"
              appear
            >
              <step1-form v-if="getActiveStep === 1" key="form-page-1" />
              <step2-form v-else-if="getActiveStep === 2" key="form-page-2" />
              <step3-form v-else-if="getActiveStep === 3" key="form-page-3" />
              <step4-form v-else-if="getActiveStep === 4" key="form-page-4" />
              <step5-form v-else-if="getActiveStep === 5" key="form-page-5" />
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
      <div :class="getActiveStep === 5 ? 'wrapper-right-step-5' : 'wrapper-right'" class="bg-primary">
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
            <step3-right />
          </div>
          <div v-if="getActiveStep === 4">
            <step4-right />
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
import Step3Form from "components/steps/Step3/Step3Form";
import Step3Right from "components/steps/Step3/Step3Right";
import Step4Form from "components/steps/Step4/Step4Form";
import Step4Right from "components/steps/Step4/Step4Right";
import Step5Form from "components/steps/Step5/Step5Form";

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
    Step3Right,
    Step4Form,
    Step4Right,
    Step5Form
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getActiveStep: "factory/getActiveStep"
    })
  }
};
</script>

<style scoped lang="stylus">
h1
  margin-top 0
.wrapper
  display flex
  flex-grow 1
.wrapper-right
  flex 1
.wrapper-right-step-5
  flex-basis 88px
  @media (min-width 1560px)
    flex-grow 1
@media (max-width 768px)
  flex-direction column
@media (max-width 1439px)
  .width-xl-screen
    height auto
    width 100%
</style>
